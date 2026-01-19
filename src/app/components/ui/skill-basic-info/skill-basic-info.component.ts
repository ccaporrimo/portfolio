import { Component, Input, OnInit } from '@angular/core';
import { SkillBasicInfo } from '../../../interfaces/skill.interface';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-basic-info',
  templateUrl: './skill-basic-info.component.html',
  styleUrls: ['./skill-basic-info.component.scss'],
  imports: [CommonModule]
})
export class SkillBasicInfoComponent implements OnInit {
  @Input() basicInfo!: SkillBasicInfo;

  constructor() { }

  ngOnInit() {
  }

}
