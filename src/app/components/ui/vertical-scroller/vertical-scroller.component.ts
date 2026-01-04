import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VerticalScrollerItem } from '../../../interfaces/vertical-scroller-item.interface';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

const testData: VerticalScrollerItem[] = [
  { imageUrl: '/assets/images/csharp-128.png', route: '/skills/c-sharp', title: 'C#', tooltip: 'C# language' },
  { imageUrl: '/assets/images/NET_Core_Logo.svg', route: '/skills/dot-net-core', title: '.NET Core', tooltip: '.NET Core framework & APIs' },
  { imageUrl: '/assets/images/angular_gradient.png', route: '/skills/angular', title: 'Angular', tooltip: 'Angular framework' },
  { imageUrl: '/assets/images/ts-logo-256.png', route: '/skills/typescript', title: 'TypeScript', tooltip: 'TypeScript language' },
  { imageUrl: '/assets/images/ngrx-logo.svg', route: '/skills/ngrx', title: 'NgRx', tooltip: 'NgRx state management' },
  { imageUrl: '/assets/images/Microsoft_SQL_Server_2025_icon.svg', route: '/skills/sql-server', title: 'SQL Server', tooltip: 'Microsoft SQL Server database' },
];

@Component({
  selector: 'app-vertical-scroller',
  templateUrl: './vertical-scroller.component.html',
  styleUrls: ['./vertical-scroller.component.scss'],
  imports: [CommonModule, MatIcon]
})
export class VerticalScrollerComponent implements AfterViewInit, OnDestroy {
  @Input() items: VerticalScrollerItem[] = testData;
  @ViewChild('scrollerContainer') scrollerContainer!: ElementRef;

  protected canScrollUp = false;
  protected canScrollDown = true;

  private _scrollAmount!: number;
  private _autoScrollIntervalId!: number;
  private _scrollDirection: 'down' | 'up' = 'down';
  private get _scrollEl(): HTMLElement | null { return this.scrollerContainer?.nativeElement; }

  ngAfterViewInit() {
    if (!this.items?.length || !this._scrollEl) return;

    if (this._scrollEl.scrollHeight <= this._scrollEl.clientHeight) {
      this.canScrollDown = false;
      this.canScrollUp = false;
      return;
    }

    this._scrollAmount = this._scrollEl.clientHeight / 4;
    this.setCanScroll();
    this._scrollEl.addEventListener('scrollend', () => this.setCanScroll());
    this.autoScroll();
  }

  ngOnDestroy(): void {
    this._autoScrollIntervalId && clearInterval(this._autoScrollIntervalId);
  }

  private setCanScroll() {
    const canScrollUp = this._scrollEl!.scrollTop > 0;        
    !canScrollUp && this.canScrollUp && (this._scrollDirection = 'down');
    this.canScrollUp = canScrollUp;

    const canScrollDown = this._scrollEl!.scrollTop + this._scrollEl!.clientHeight + 1 < this._scrollEl!.scrollHeight;
    !canScrollDown && this.canScrollDown && (this._scrollDirection = 'up');
    this.canScrollDown = canScrollDown;
  }

  public scroll(direction: 'up' | 'down') {
    if (!this._scrollEl) return;
    direction == 'up' ? this.scrollUp() : this.scrollDown();
  }

  private scrollUp() {
    this.scrollerContainer.nativeElement.scrollBy({ top: -this._scrollAmount, behavior: 'smooth' });
  }

  private scrollDown() {
    this.scrollerContainer.nativeElement.scrollBy({ top: this._scrollAmount, behavior: 'smooth' });
  }

  private autoScroll() {
    this._autoScrollIntervalId = setInterval(() => this._scrollDirection === 'down' ? this.scrollDown() : this.scrollUp(), 3000);
  }
}
