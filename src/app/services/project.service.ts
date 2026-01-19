import { Injectable } from '@angular/core';
import { PortfolioProject, ProjectBasicInfo } from '../interfaces/project.interface';
import { SkillTypeEnum } from '../constants/skill.constants';
import { Companies, ProjectIdEnum } from '../constants/project.constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Year } from './helpers';

const S = SkillTypeEnum;
const Id = ProjectIdEnum;

const onlineBookingDescription = `<p>I led a full rearchitecture of the online booking system’s front‑end <span app-skill="${S.Angular}">Angular</span> SPA, focusing on clarity, performance, styling using <span app-skill="${S.Scss}">SCSS</span>, and long‑term maintainability. The updated structure emphasizes clean separation of responsibilities, streamlined <span app-skill="${S.NgRx}">NgRx</span> state management, and a more predictable component hierarchy. These improvements not only reduced technical debt but also created a foundation that is easier to extend as new features are introduced.</p>
<p>On the backend, I redesigned the API layer in <span app-skill="${S.CSharp}">C#</span> to better isolate concerns across the middle tier and middleware. By shifting to a more object‑oriented approach, I eliminated large branching logic blocks and replaced them with modular, testable components. This restructuring improved readability, reduced coupling, and strengthened the overall reliability of the system.</p>
<p>To enhance security and user experience, I implemented a one‑time‑password authentication flow alongside OIDC integrations with Google and Facebook. These additions modernized the login process and provided users with flexible, secure sign‑in options. I also introduced subtle interface animations—including page‑transition effects and calendar fly‑ins—to create a smoother, more polished interaction model throughout the application.</p>
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public readonly projects: PortfolioProject[];

  private _basicInfosById: { [id in ProjectIdEnum]: ProjectBasicInfo } = {
    [Id.Analytics]: { soloEffort: true, timespan: { startDate: new Year(2024), endDate: new Year(2025) }, company: Companies.Meevo },
    [Id.OnlineBooking]: { soloEffort: false, timespan: { startDate: new Year(2025), endDate: new Year(2026) }, company: Companies.Meevo, website: 'https://na2.meevo.com/CustomerPortal/advanced-ob/appointment-details?tenantId=500000&locationId=500001' },
    [Id.EGift]: { soloEffort: false, timespan: { startDate: new Year(2024), endDate: new Year(2025) }, company: Companies.Meevo, website: 'https://na2.meevo.com/CustomerPortal/egift?tenantId=500000&locationId=500001' },
    [Id.Scheduler]: { soloEffort: false, timespan: { startDate: new Year(2024) }, company: Companies.Meevo },
    [Id.CustomBranding]: { soloEffort: true, timespan: { startDate: new Year(2024) }, company: Companies.Meevo },
    [Id.Security]: { soloEffort: false, timespan: { startDate: new Year(2025), endDate: new Year(2026) }, company: Companies.Meevo },
    [Id.MultiTenantData]: { soloEffort: false, timespan: { startDate: new Year(2023), endDate: new Year(2026) }, company: Companies.Meevo }
  }
  
  private _projects: Partial<PortfolioProject>[] = [
      { id: Id.Analytics, title: 'Online Analytics', svgIcon: 'project-analytics', skillIds: [S.Angular, S.NgRx, S.GoogleAnalytics] },
      { id: Id.OnlineBooking, title: 'Online Booking', svgIcon: 'project-online-booking', skillIds: [S.CSharp, S.DotNetCore, S.Angular, S.NgRx, S.RxJs, S.Scss, S.SqlServer, S.Redis, S.AzureDevOps], description: onlineBookingDescription },
      { id: Id.EGift, title: 'eGift Cards', svgIcon: 'project-egift', skillIds: [S.Angular, S.NgRx, S.RxJs, S.Aws, S.Scss] },
      { id: Id.Scheduler,  title: 'Scheduling & Time Clock', svgIcon: 'project-schedule-system', skillIds: [S.Angular, S.NgRx, S.RxJs, S.Scss, S.SqlServer] },
      { id: Id.CustomBranding, title: 'Custom Branding', svgIcon: 'project-custom-branding', skillIds: [S.CSharp, S.DotNetCore, S.Redis, S.Angular, S.NgRx, S.RxJs, S.Aws] },
      { id: Id.Security, title: 'Security', svgIcon: 'project-security-system', skillIds: [S.CSharp, S.DotNetCore, S.Redis, S.Aws, S.AzureDevOps, S.SqlServer] },
      { id: Id.MultiTenantData, title: 'Multi-tenant Data', svgIcon:'project-data-maintenance', skillIds: [S.CSharp, S.DotNetCore, S.SqlServer, S.Redis] }
  ];

  constructor(private _sanitizer: DomSanitizer) {
    this.projects = this._projects.map(p => ({
    ...p,
    title: p.title ?? '',
    route: '/projects/' + p.id,
    description: p.description && typeof(p.description) == 'string'
      ? this._sanitizer.bypassSecurityTrustHtml(p.description)
      : '',
    basicInfo: this._basicInfosById[p.id as ProjectIdEnum]
  }));
  }
}
