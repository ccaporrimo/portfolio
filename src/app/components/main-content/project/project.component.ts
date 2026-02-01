import { Component, ElementRef, NgZone, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { PortfolioProject } from '../../../interfaces/project.interface';
import { MatIcon } from "@angular/material/icon";
import { SkillService } from '../../../services/skill.service';
import { take } from 'rxjs';
import { BrowserHelpers } from '../../../services/helpers';
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../ui/skill-dialog/skill-dialog.component';
import { ProjectBasicInfoComponent } from "../../ui/project-basic-info/project-basic-info.component";
import { SkillTypeEnum } from '../../../constants/skill.constants';
import { ResizeableComponentBase } from '../../resizeable.component.base';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  imports: [MatIcon, ProjectBasicInfoComponent]
})
export class ProjectComponent extends ResizeableComponentBase {
  protected currentProject: WritableSignal<PortfolioProject | null> = signal(null);
  protected selectedSkillId: SkillTypeEnum | string | null = null;

  private get _el() { return this._elRef?.nativeElement as HTMLElement; }

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _skillService: SkillService,
    private _ngZone: NgZone,
    private _elRef: ElementRef,
    private _router: Router,
    private _dialog: MatDialog) {

    super();
    this._route.paramMap.subscribe(paramMap => this.routeChanged(paramMap.get('projectName')));
  }

  protected viewSkill(skillId?: string | null) {
    if (!skillId) return;

    !this.isMobile() && (this.selectedSkillId = skillId);

    if (this.isMobile()) {
      this._dialog.open(SkillDialogComponent, {
        height: '50dvh',
        width: '100dvw',
        panelClass: ['dialog-slide-up'],
        disableClose: true,
        data: { skill: this._skillService.skills.find(s => s.id == skillId) }
      });
      return;
    }
    
    this._router.navigate([{ outlets: { rightpanel: ['skills', skillId] } }]);
  }

  private routeChanged(projectName: string | null) {
    if (!projectName) return;

    const project = this._projectService.projects.find(p => p.route.includes(projectName)) ?? null;
    if (!project) return;
    
    project.skills = project?.skillIds?.map(id => this._skillService.skills.find(s => s.id === id)).filter(s => !!s) ?? [];
    this.currentProject.set(project);
    this._router.navigate([{ outlets: { rightpanel: null } }]);
    this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(_ => {      
      this._el.querySelectorAll('[app-skill]').forEach(skillEl => skillEl.addEventListener('click', event => this.skillLinkClicked(event.target as HTMLElement)))
      this._el.querySelector('.skill-row')?.scrollTo({ left: 0 });
    });
  }

  private skillLinkClicked(skillEl: HTMLElement) {
    if (!skillEl) return;

    const skillId = skillEl.getAttribute('app-skill');
    this.viewSkill(skillId);
  }
}
