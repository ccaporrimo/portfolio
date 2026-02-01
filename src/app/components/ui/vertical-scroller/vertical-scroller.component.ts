import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ScrollDirection, VerticalScrollerItem } from '../../../interfaces/vertical-scroller.interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { ResizeableComponentBase } from '../../resizeable.component.base';

@Component({
  selector: 'app-vertical-scroller',
  templateUrl: './vertical-scroller.component.html',
  styleUrls: ['./vertical-scroller.component.scss'],
  imports: [CommonModule, MatIcon]
})
export class VerticalScrollerComponent extends ResizeableComponentBase implements OnInit, AfterViewInit, OnDestroy {
  @Input() items!: VerticalScrollerItem[];
  @Input() numberVisibleItems: number = 4;
  @Input() autoScrollInterval:number = 5000;
  @Input() gapPercent: number = 8;

  @Output() itemSelected: EventEmitter<VerticalScrollerItem> = new EventEmitter();

  @ViewChild('scroller') scroller!: ElementRef;
  
  @HostBinding('style.--num-visible-items')
  numVisibleItems = this.numberVisibleItems;

  @HostBinding('style.--gap-in-percent')
  gapInPercent = `${this.gapPercent}%`;

  @HostListener('pointerenter')
  pointerEntered = () => this.disableAutoScroll();

  @HostListener('pointerleave')
  pointerLeft = () => this.autoScroll();

  protected hoveredIndex: number | null = null;
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
    this.isMobile() && this.setupGestures();
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

  private touchScroll(direction: ScrollDirection) {
    this._scrollAnimationOptions.duration = 200;
    this.scroll(direction);
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
    const nextVisibleSet = Array.from({ length: this.numberVisibleItems + 2 }).map((_, offset) => JSON.parse(JSON.stringify(this.items[this.calcIndex(offset)])) as VerticalScrollerItem);
    nextVisibleSet.forEach(i => i.visualId = v4());
    this.visibleItems$.next(nextVisibleSet);
  }

  private calcIndex = (offset: number) => (this._currentIndex + offset + this.items.length) % this.items.length;
  
  private animateScroll(direction: ScrollDirection): void {
    if (!this._scrollEl) return;
    
    this._isScrolling = true;
    const hoveredIndex = this.hoveredIndex;
    this.hoveredIndex = null;
    const keyframes = this.getScrollAnimationKeyframes(direction);
    const anim = this._scrollEl.animate(keyframes, this._scrollAnimationOptions);
    
    anim.finished.then(_ => {
      anim.cancel();
      this._isScrolling = false;
      this.hoveredIndex = hoveredIndex;
      requestAnimationFrame(_ => this.setVisibleItems());
    });
  }

  private getScrollAnimationKeyframes(direction: ScrollDirection): Keyframe[] {
    const negation = direction === 'up' ? '' : '-';
    return [{ transform: 'translateY(0%)' }, { transform: `translateY(${negation}${this._scrollAmount})` }];
  }

  private setupGestures() {
    const hammer = new Hammer(this.scroller.nativeElement);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('swipeup', () => this.touchScroll('down'));
    hammer.on('swipedown', () => this.touchScroll('up'));
  }

  private disableAutoScroll = () => this._autoScrollIntervalId && clearInterval(this._autoScrollIntervalId);
  private autoScroll = () => this.canScroll && !this.isMobile() && (this._autoScrollIntervalId = setInterval(() => this.autoScrollWorker(), this._interval));  

  private autoScrollWorker() {
    this._scrollAnimationOptions.duration = 750;
    this.scroll(this._autoScrollDirection);
  }
}