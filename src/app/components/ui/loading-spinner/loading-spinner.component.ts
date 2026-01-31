import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() isLoading: boolean = true;
  @Input() isInverted: boolean = false;
  @Input() isWidthBound: boolean = false;
}
