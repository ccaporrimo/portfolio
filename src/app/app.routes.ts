import { Routes } from '@angular/router';
import { SkillComponent } from './components/main-content/skill/skill.component';

export const routes: Routes = [
    {
        path: 'skills/:skillName',
        component: SkillComponent
    }
];
