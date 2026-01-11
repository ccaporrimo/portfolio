import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

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
export class SideDrawerComponent implements OnInit {
  @Input() side: Sides = Sides.Left;
  @Input() slideDuration: number = 500;

  protected Sides = Sides;
  protected isOpen = false;
  protected isClosing = false;

  private set _animationDuration(val: number) {
    this.animationDuration = `${val / 1000}s`;
  }

  private get _animationDuration() { return this.slideDuration; }

  @HostBinding('style.--animation-duration')
  animationDuration!: string;

  ngOnInit(): void {
    this._animationDuration = this.slideDuration;
  }

  toggleDrawer() {
    if (!this.isOpen) {
      this.isOpen = true;
      return;
    }

    if (this.isOpen) {
      this.isClosing = true;
      this.isOpen = false;
      setTimeout(() => {        
        this.isClosing = false;
      }, this._animationDuration);
    }
  }

}
