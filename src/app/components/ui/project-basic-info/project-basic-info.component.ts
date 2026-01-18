import { Component, Input, OnInit } from '@angular/core';
import { ProjectBasicInfo } from '../../../interfaces/project.interface';
import { DatePipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-project-basic-info',
  templateUrl: './project-basic-info.component.html',
  styleUrls: ['./project-basic-info.component.scss'],
  imports: [DatePipe, MatIcon]
})
export class ProjectBasicInfoComponent {
  @Input() basicInfo!: ProjectBasicInfo;

  protected openExternalLink(url: string) {
    window.open(url, '_blank');
  }

}
