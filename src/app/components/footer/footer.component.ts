import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ResizeableComponentBase } from '../resizeable.component.base';
import { SocialMediaLink } from '../../interfaces/ui.interface';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [NgTemplateOutlet]
})
export class FooterComponent extends ResizeableComponentBase {
  @Input() profileTitle!: string;
  @Input() socialMediaLinks!: SocialMediaLink[];

  protected readonly currentYear = new Date().getFullYear();

  constructor() { super(); }

}
