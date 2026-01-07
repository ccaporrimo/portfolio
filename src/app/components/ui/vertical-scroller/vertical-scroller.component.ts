import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollDirection, VerticalScrollerItem } from '../../../interfaces/vertical-scroller.interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

const testData: VerticalScrollerItem[] = [
  { imageUrl: '/assets/images/512px-Amazon_Web_Services_Logo.png', route: '/skills/aws', title: 'AWS' },
  { imageUrl: '/assets/images/csharp-128.png', route: '/skills/c-sharp', title: 'C#', tooltip: 'C# language' },
  { imageUrl: '/assets/images/NET_Core_Logo.svg', route: '/skills/dot-net-core', title: '.NET Core', tooltip: '.NET Core framework & APIs' },
  { imageUrl: '/assets/images/angular_gradient.png', route: '/skills/angular', title: 'Angular', tooltip: 'Angular framework' },
  { imageUrl: '/assets/images/Microsoft_SQL_Server_2025_icon.svg', route: '/skills/sql-server', title: 'SQL Server', tooltip: 'Microsoft SQL Server database' },
  { imageUrl: '/assets/images/ngrx-logo.svg', route: '/skills/ngrx', title: 'NgRx', tooltip: 'NgRx state management' },
  { imageUrl: '/assets/images/redis-icon.svg', route: '/skills/redis', title: 'Redis' },  
  { imageUrl: '/assets/images/Sass.png', route: '/skills/scss', title: 'SCSS' },
  { imageUrl: '/assets/images/Rx_Logo-512-512.png', route: '/skills/rxjs', title: 'RxJs & Reactive' },
  { imageUrl: '/assets/images/ts-logo-256.png', route: '/skills/typescript', title: 'TypeScript', tooltip: 'TypeScript language' },  
  { imageUrl: '/assets/images/Azure-DevOps.svg', route: '/skills/azure-devops', title: 'Azure DevOps' },
];

@Component({
  selector: 'app-vertical-scroller',
  templateUrl: './vertical-scroller.component.html',
  styleUrls: ['./vertical-scroller.component.scss'],
  imports: [CommonModule, MatIcon]
})
export class VerticalScrollerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() items: VerticalScrollerItem[] = testData;
  @Input() numberVisibleItems: number = 4;
  @Input() autoScrollInterval:number = 5000;
  @Input() gapPercent: number = 8;

  @ViewChild('scroller') scroller!: ElementRef;
  
  @HostBinding('style.--num-visible-items')
  numVisibleItems = this.numberVisibleItems;

  @HostBinding('style.--gap-in-percent')
  gapInPercent = `${this.gapPercent}%`;

  @HostListener('pointerenter')
  pointerEntered = () => this.disableAutoScroll();

  @HostListener('pointerleave')
  pointerLeft = () => this.autoScroll();

  protected canScroll = false;
  protected visibleItems$: BehaviorSubject<VerticalScrollerItem[]> = new BehaviorSubject([] as VerticalScrollerItem[]);

  private _currentIndex: number = 0;  
  private _autoScrollIntervalId!: number;
  private _isScrolling: boolean = false;
  private _autoScrollDirection: ScrollDirection = 'down';
  
  private get _scrollEl(): HTMLElement | null { return this.scroller?.nativeElement; }
  private get _interval() { return this.autoScrollInterval; } 
  private get _scrollAmount(): string { return `${100 / this.numberVisibleItems}%`; }

  private readonly _scrollAnimationOptions: KeyframeAnimationOptions = { duration: 750, easing: 'ease-in-out', fill: 'forwards' };

  ngOnInit() {
    this.setVisibleItems();
    this.numVisibleItems = this.numberVisibleItems;
    this.gapInPercent = `${this.gapPercent}%`;
  }

  ngAfterViewInit() {
    if (!this.items?.length || !this._scrollEl || !this.canScroll) return;

    this.autoScroll();
  }

  ngOnDestroy(): void {
    this._autoScrollIntervalId && clearInterval(this._autoScrollIntervalId);
    this.visibleItems$.complete();
  }

  public arrowScroll(direction: ScrollDirection) {
    this._scrollAnimationOptions.duration = 300;
    this.scroll(direction);
  }

  public wheelScroll(event: WheelEvent) {
    event.stopPropagation();
    this._scrollAnimationOptions.duration = 200;
    this.scroll(event.deltaY > 0 ? 'down' : 'up');
  }
  
  private scroll(direction: ScrollDirection) {
    if (!this._scrollEl || this._isScrolling) return;
    
    this._autoScrollDirection = direction;
    this._currentIndex += direction === 'up' ? -1 : 1;
    this._currentIndex < 0 && (this._currentIndex = this.items.length + this._currentIndex);
    this.animateScroll(direction);    
  }

  private setVisibleItems(): void {
    if (this.items!.length <= this.numberVisibleItems) {
      this.visibleItems$.next(this.items);
      return;      
    }
    
    this.canScroll = true;
    const nextVisibleSet = Array.from({ length: this.numberVisibleItems + 2 }).map((_, offset) => this.items[this.calcIndex(offset)]);
    this.visibleItems$.next(nextVisibleSet);
  }

  private calcIndex = (offset: number) => (this._currentIndex + offset + this.items.length) % this.items.length;
  
  private animateScroll(direction: ScrollDirection): void {
    if (!this._scrollEl) return;
    
    this._isScrolling = true;
    const keyframes = this.getScrollAnimationKeyframes(direction);
    const anim = this._scrollEl.animate(keyframes, this._scrollAnimationOptions);
    
    anim.finished.then(_ => {
      anim.cancel();
      this._isScrolling = false;
      requestAnimationFrame(_ => this.setVisibleItems());
    });
  }

  private getScrollAnimationKeyframes(direction: ScrollDirection): Keyframe[] {
    const negation = direction === 'up' ? '' : '-';
    return [{ transform: 'translateY(0%)' }, { transform: `translateY(${negation}${this._scrollAmount})` }];
  }

  private disableAutoScroll = () => this._autoScrollIntervalId && clearInterval(this._autoScrollIntervalId);
  private autoScroll = () => this.canScroll && (this._autoScrollIntervalId = setInterval(() => this.autoScrollWorker(), this._interval));
  
  private autoScrollWorker() {
    this._scrollAnimationOptions.duration = 750;
    this.scroll(this._autoScrollDirection);
  }
}