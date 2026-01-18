import { Injectable } from '@angular/core';
import { PortfolioProject } from '../interfaces/project.interface';
import { SkillTypeEnum } from '../constants/skill.constants';
import { Companies, ProjectIdEnum } from '../constants/project.constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Year } from './helpers';

const S = SkillTypeEnum;
const Id = ProjectIdEnum;

const onlineBookingDescription = `<p>I led a full rearchitecture of the online booking system’s front‑end <span app-skill="${S.Angular}">Angular</span> SPA, focusing on clarity, performance, styling using <span app-skill="${S.Scss}">SCSS</span>, and long‑term maintainability. The updated structure emphasizes clean separation of responsibilities, streamlined <span app-skill="${S.NgRx}">NgRx</span> state management, and a more predictable component hierarchy. These improvements not only reduced technical debt but also created a foundation that is easier to extend as new features are introduced.</p>
<p>On the backend, I redesigned the API layer to better isolate concerns across the middle tier and middleware. By shifting to a more object‑oriented approach, I eliminated large branching logic blocks and replaced them with modular, testable components. This restructuring improved readability, reduced coupling, and strengthened the overall reliability of the system.</p>
<p>To enhance security and user experience, I implemented a one‑time‑password authentication flow alongside OIDC integrations with Google and Facebook. These additions modernized the login process and provided users with flexible, secure sign‑in options. I also introduced subtle interface animations—including page‑transition effects and calendar fly‑ins—to create a smoother, more polished interaction model throughout the application.</p>
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public readonly projects: PortfolioProject[];
  private _projects: Partial<PortfolioProject>[] = [
      { id: Id.Analytics, title: 'Online Analytics', svgIcon: 'project-analytics', skillIds: [S.Angular, S.NgRx], basicInfo: { soloEffort: true, timespan: { startDate: new Year(2024), endDate: new Year(2025) }, company: Companies.Meevo } },
      { id: Id.OnlineBooking, title: 'Online Booking', svgIcon: 'project-online-booking', skillIds: [S.CSharp, S.DotNetCore, S.Angular, S.NgRx, S.SqlServer, S.Redis, S.AzureDevOps], description: onlineBookingDescription, basicInfo: { soloEffort: false, timespan: { startDate: new Year(2025), endDate: new Year(2026) }, company: Companies.Meevo, website: 'https://na2.meevo.com/CustomerPortal/advanced-ob/appointment-details?tenantId=500000&locationId=500001' } },
      { id: Id.EGift,  title: 'eGift Cards', svgIcon: 'project-egift' },
      { id: Id.Scheduler,  title: 'Scheduling & Time Clock', svgIcon: 'project-schedule-system' },
      { id: Id.CustomBranding, title: 'Custom Branding', svgIcon: 'project-custom-branding' },
      { id: Id.Security, title: 'Security', svgIcon: 'project-security-system' },
      { id: Id.MultiTenantData, title: 'Multi-tenant Data', svgIcon:'project-data-maintenance' }
  ];

  constructor(private _sanitizer: DomSanitizer) {
    this.projects = this._projects.map(p => ({
    ...p,
    title: p.title ?? '',
    route: '/projects/' + p.id,
    description: p.description && typeof(p.description) == 'string'
      ? this._sanitizer.bypassSecurityTrustHtml(p.description)
      : ''
  }));
  }
}
