import { Component } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../interfaces/skill.interface';
import { SkillBasicInfoComponent } from "../skill-basic-info/skill-basic-info.component";
import { MatIcon } from "@angular/material/icon";
import { ParamRouteComponentBase } from '../../param-route.component.base';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  imports: [SkillBasicInfoComponent, MatIcon]
})
export class SkillComponent extends ParamRouteComponentBase<Skill> {
  constructor(private _skillService: SkillService) {
    super('skillName');    
  }

  protected override getItemByRouteParam = (id: string): Skill | undefined => {
    return this._skillService.getSkillByRouteParam(id);
  }
}
