import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VerticalScrollerComponent } from "../ui/vertical-scroller/vertical-scroller.component";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  imports: [RouterOutlet, VerticalScrollerComponent]
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
