import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../interfaces/skill.interface';
import { AnimationHelpers, BrowserHelpers } from '../../../services/helpers';
import { SkillBasicInfoComponent } from "../skill-basic-info/skill-basic-info.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  imports: [SkillBasicInfoComponent, MatIcon]
})
export class SkillComponent implements OnInit {
  @Input() skill?: Skill;
  protected currentSkill: WritableSignal<Skill | null> = signal(null);
  
  private _animationOptions: KeyframeAnimationOptions = { duration: 333, easing: 'ease' };  

  private get _el() { return this._elRef?.nativeElement; }

  @ViewChild('container') container!: ElementRef<HTMLElement>;

  constructor(private _route: ActivatedRoute, private _skillService: SkillService, private _elRef: ElementRef) {    
  }

  ngOnInit(): void {
    !!this.skill ? this.currentSkill.set(this.skill) : this._route.paramMap.subscribe(paramMap => this.routeChanged(paramMap.get('skillName')));
  }

  private routeChanged(skillName: string | null) {
    this.animateOut$().subscribe(_ => {
      if (!skillName) {
        console.error('Invalid skill route passed');
        return;
      }

      const skill = this._skillService.getSkillByRouteParam(skillName);
      if (!skill) return;

      this.currentSkill.set(skill);
      this.animateIn();
    })    
  }

  private animateOut$() {
    if (!this._el || !this.currentSkill()) return of({});
    const keyframes = [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }];
    return AnimationHelpers.animateEl$(this._el, keyframes, this._animationOptions);
  }

  private animateIn() {
    if (!this._el) return; 
    const keyframes = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }];
    this._el.animate(keyframes, this._animationOptions);
  }
}
