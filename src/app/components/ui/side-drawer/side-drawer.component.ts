import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { of, Subject } from 'rxjs';
import { ResizeableComponentBase } from '../../resizeable.component.base';

export enum Sides {
  Right,
  Left
}

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss'],
  imports: [MatIcon, CommonModule]
})
export class SideDrawerComponent extends ResizeableComponentBase implements OnInit, AfterViewInit {
  @Input() side: Sides = Sides.Left;
  @Input() slideDuration: number = 500;

  public isOpen = false;
  
  protected Sides = Sides;  
  protected isClosing = false;

  private set _animationDuration(val: number) { this.animationDuration = `${val / 1000}s`; }
  private get _animationDuration() { return this.slideDuration; }

  private get _openCloseToggleEl() { return this.openCloseToggleRef?.nativeElement; }

  @HostBinding('style.--animation-duration')
  animationDuration!: string;

  @ViewChild('openCloseToggle') openCloseToggleRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this._animationDuration = this.slideDuration;
  }

  ngAfterViewInit(): void {
    if (!this.isMobile()) return;

    const hammer = new Hammer(this._openCloseToggleEl);
    hammer.on('swiperight', () => this.openDrawer());
    hammer.on('swipeleft', () => this.closeDrawer$());
  }

  public closeDrawer$() {
    if (!this.isOpen) {
      return of(void 0);
    }

    const subj$ = new Subject<void>();
    this.toggleDrawer();
    setTimeout(() => { subj$.next(); subj$.complete(); }, this._animationDuration / 2);

    return subj$.asObservable();
  }
  public openDrawer() { !this.isOpen && this.toggleDrawer(); }

  toggleDrawer() {
    if (!this.isOpen) {
      this.isOpen = true;
      return;
    }

    if (this.isOpen) {
      this.isClosing = true;
      this.isOpen = false;
      setTimeout(() => this.isClosing = false, this._animationDuration);
    }
  }

}
