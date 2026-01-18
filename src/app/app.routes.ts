import { Routes } from '@angular/router';
import { SkillComponent } from './components/ui/skill/skill.component';
import { ProjectComponent } from './components/main-content/project/project.component';

export const routes: Routes = [
    {
        path: 'skills/:skillName',
        component: SkillComponent
    },
    {
        path: 'skills/:skillName',
        component: SkillComponent,
        outlet: 'rightpanel'
    },
    {
        path: 'projects/:projectName',
        component: ProjectComponent
    }
];
