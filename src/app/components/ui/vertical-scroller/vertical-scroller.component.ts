import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VerticalScrollerItem } from '../../../interfaces/vertical-scroller-item.interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

const testData: VerticalScrollerItem[] = [
  { imageUrl: '/assets/images/512px-Amazon_Web_Services_Logo.png', route: '/skills/aws', title: 'AWS' },
  { imageUrl: '/assets/images/csharp-128.png', route: '/skills/c-sharp', title: 'C#', tooltip: 'C# language' },
  { imageUrl: '/assets/images/NET_Core_Logo.svg', route: '/skills/dot-net-core', title: '.NET Core', tooltip: '.NET Core framework & APIs' },
  { imageUrl: '/assets/images/angular_gradient.png', route: '/skills/angular', title: 'Angular', tooltip: 'Angular framework' },  
  { imageUrl: '/assets/images/ngrx-logo.svg', route: '/skills/ngrx', title: 'NgRx', tooltip: 'NgRx state management' },
  { imageUrl: '/assets/images/Rx_Logo-512-512.png', route: '/skills/rxjs', title: 'RxJs & Reactive' },
  { imageUrl: '/assets/images/ts-logo-256.png', route: '/skills/typescript', title: 'TypeScript', tooltip: 'TypeScript language' },
  { imageUrl: '/assets/images/Microsoft_SQL_Server_2025_icon.svg', route: '/skills/sql-server', title: 'SQL Server', tooltip: 'Microsoft SQL Server database' },
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
  @ViewChild('scroller') scroller!: ElementRef;

  protected canScroll = false;
  protected visibleItems$: BehaviorSubject<VerticalScrollerItem[]> = new BehaviorSubject([] as VerticalScrollerItem[]);
  protected previousItem$: BehaviorSubject<VerticalScrollerItem> | null = null;
  protected nextItem$: BehaviorSubject<VerticalScrollerItem> | null = null;

  private _currentIndex: number = 0;  
  private _autoScrollIntervalId!: number;
  private _isScrolling: boolean = false;
  private get _scrollEl(): HTMLElement | null { return this.scroller?.nativeElement; }

  private readonly _numVisibleItems = 4;
  private readonly _interval = 5000;
  private readonly _scrollAmount: string = `${100 / this._numVisibleItems}%`;
  private readonly _scrollAnimationOptions: KeyframeAnimationOptions = { duration: 750, easing: 'ease-in-out', fill: 'forwards' };

  ngOnInit() {
    this.setVisibleItems();
  }

  ngAfterViewInit() {
    if (!this.items?.length || !this._scrollEl || !this.canScroll) return;

    this.autoScroll();
  }

  ngOnDestroy(): void {
    this._autoScrollIntervalId && clearInterval(this._autoScrollIntervalId);
    this.visibleItems$.complete();
    this.nextItem$?.complete();
    this.previousItem$?.complete();
  }

  public scroll(direction: 'up' | 'down', isManual: boolean = true) {
    if (!this._scrollEl || this._isScrolling) return;
    
    isManual && clearInterval(this._autoScrollIntervalId);

    this._currentIndex += direction === 'up' ? -1 : 1;
    this._currentIndex < 0 && (this._currentIndex = this.items.length + this._currentIndex);
    this._scrollAnimationOptions.duration = isManual ? 300 : 750;
    this.animateScroll(direction);    
  }

  public wheelScroll(event: WheelEvent) {
    event.stopPropagation();
    this.scroll(event.deltaY > 0 ? 'down' : 'up');
  }

  public itemHoverChange(item: VerticalScrollerItem, state: 'enter' | 'leave') {
    clearInterval(this._autoScrollIntervalId);
    item.hovered = state === 'enter';
  }

  private setVisibleItems(): void {
    if (this.items!.length <= this._numVisibleItems) {
      this.visibleItems$.next(this.items);
      return;      
    }
    
    this.canScroll = true;
    const nextVisibleSet = Array.from({ length: this._numVisibleItems + 2 }).map((_, offset) => this.items[this.calcIndex(offset)]);
    this.visibleItems$.next(nextVisibleSet);
    this.setNonVisibleItems();
  }

  private calcIndex = (offset: number) => (this._currentIndex + offset + this.items.length) % this.items.length;

  private setNonVisibleItems() {
    const prevIndex = this.calcIndex(-1);
    const nextIndex = this.calcIndex(this._numVisibleItems);
    if (!!this.previousItem$) {
      this.previousItem$.next(this.items[prevIndex]);
      this.nextItem$?.next(this.items[nextIndex]);
      return;
    }

    this.previousItem$ = new BehaviorSubject(this.items[prevIndex]);
    this.nextItem$ = new BehaviorSubject(this.items[nextIndex]);
  }
  
  private animateScroll(direction: 'up' | 'down'): void {
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

  private getScrollAnimationKeyframes(direction: 'up' | 'down'): Keyframe[] {
    const negation = direction === 'up' ? '' : '-';
    return [{ transform: 'translateY(0%)' }, { transform: `translateY(${negation}${this._scrollAmount})` }];
  }

  private autoScroll() {
    this._autoScrollIntervalId = setInterval(() => this.scroll('down', false), this._interval);
  }
}
