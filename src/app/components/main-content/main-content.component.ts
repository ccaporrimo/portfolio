import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VerticalScrollerComponent } from "../ui/vertical-scroller/vertical-scroller.component";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  imports: [RouterOutlet, VerticalScrollerComponent]
})
export class MainContentComponent {

  protected showScroller = signal(false);

  constructor() {
    this.updateShowScroller();
    window.addEventListener('resize', () => this.updateShowScroller())
  }

  private updateShowScroller() {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    this.showScroller.set(isLandscape && window.innerWidth > 1024);
  }
}
