import { Routes } from '@angular/router';
import { SkillComponent } from './components/ui/skill/skill.component';
import { ProjectComponent } from './components/main-content/project/project.component';
import { TimelineComponent } from './components/main-content/timeline/timeline.component';
import { BiographyComponent } from './components/main-content/biography/biography.component';
import { NotFoundComponent } from './components/ui/not-found/not-found.component';
import { ResumeComponent } from './components/main-content/resume/resume.component';
import { HistoryDetailComponent } from './components/main-content/history-detail/history-detail.component';
import { ContactComponent } from './components/main-content/contact/contact.component';
import { HistoryComponent } from './components/main-content/history/history.component';
import { firstVisitGuard } from './app.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'bio',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [firstVisitGuard],
        children: [
            {
                path: 'bio',
                component: BiographyComponent
            },
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
            },
            {
                path: 'timeline',
                component: HistoryComponent
            },
            {
                path: 'history/:timelineId',
                component: HistoryDetailComponent,
                outlet: 'rightpanel'
            },
            {
                path: 'resume',
                component: ResumeComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ] 
    }    
];
