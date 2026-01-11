import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../interfaces/skill.interface';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  imports: [AsyncPipe]
})
export class SkillComponent implements OnDestroy {
  protected currentSkill$: Subject<Skill> = new Subject();

  private _currentSkillRoute$: Subject<string> = new Subject();

  constructor(private _route: ActivatedRoute, private _skillService: SkillService) {
    this._route.paramMap.subscribe(params => this.routeChanged(params));
    this._currentSkillRoute$.subscribe(sr => this.establishSkillData(sr));
  }

  ngOnDestroy(): void {
    this._currentSkillRoute$?.complete();
  }

  private establishSkillData(skillRoute: string) {
    const skill = this._skillService.getSkillByRouteParam(skillRoute);
    if (!skill) return;
    this.currentSkill$.next(skill);
  }

  private routeChanged(params: ParamMap) {
    const skillRoute = params.get('skillName');
    if (!skillRoute) {
      console.error('Invalid skill route passed');
      return;
    }

    this._currentSkillRoute$.next(skillRoute);
  }
}
