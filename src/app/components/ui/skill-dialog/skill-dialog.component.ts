import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SkillComponent } from "../skill/skill.component";
import { Skill } from '../../../interfaces/skill.interface';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss'],
  imports: [MatIcon, MatDialogContent, SkillComponent, MatDialogActions]
})

export class SkillDialogComponent {
  protected skill: Skill;
  protected isExpert: boolean = false;
  protected isAdept: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) _data: { skill: Skill }, private _dialogRef: MatDialogRef<SkillDialogComponent>) {
    if (!_data.skill) throw Error('SKILL IS REQUIRED FOR THIS DIALOG');
    this.skill = _data.skill;
    const level = this.skill.basicInfo?.skillLevel ?? 0;
    this.isExpert = level > 8;
    this.isAdept = !this.isExpert && level > 7;
  }

  close() {
    const panel = document.querySelector('.cdk-overlay-pane.mat-mdc-dialog-panel.dialog-slide-up');
    if (!panel) {
      this._dialogRef.close();
      return;
    }

    panel.classList.add('dialog-slide-down')
    setTimeout(() => this._dialogRef.close(), 250);
  }

}
