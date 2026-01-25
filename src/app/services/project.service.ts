import { Injectable } from '@angular/core';
import { PortfolioProject, ProjectBasicInfo } from '../interfaces/project.interface';
import { SkillTypeEnum } from '../constants/skill.constants';
import { Companies, ProjectIdEnum } from '../constants/project.constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Year } from './helpers';
import { BehaviorSubject } from 'rxjs';

const S = SkillTypeEnum;
const Id = ProjectIdEnum;

const onlineBookingDescription = `<p>What started off as a self-initiated POC to proof out a better flow and design for the company's Online Booking system turned into an official full team reimplementation tracked in <span app-skill="${S.AzureDevOps}">Azure DevOps</span>. Written in <span app-skill="${S.TypeScript}">TypeScript</span> using the <span app-skill="${S.Angular}">Angular 16</span> framework, we rebuilt the Online Booking SPA from the ground up using a scaffolded architecture that takes advantage of the <span app-skill="${S.RxJs}">RxJs</span> observable pattern. Focusing on clarity, performance, styling using <span app-skill="${S.Scss}">SCSS</span>, and long‑term maintainability. The updated structure emphasizes clean separation of responsibilities, streamlined <span app-skill="${S.NgRx}">NgRx</span> state management, and a more predictable component hierarchy. These improvements not only reduced technical debt but also created a foundation that is easier to extend as new features are introduced.</p>
<p>In the backend, I created new endpoints for the API layer in <span app-skill="${S.CSharp}">C#</span> and the <span app-skill="${S.DotNetCore}">.NET Core</span> framework to allow for legacy Online Booking users to continue usage without impact while vastly improving response time and reducing round-trip calls which also caused race conditions in the <span app-skill="${S.NgRx}">NgRx</span> state management system. By shifting to a more object‑oriented approach, I eliminated large branching logic blocks and replaced them with modular, testable components. This restructuring improved readability, reduced coupling, and strengthened the overall reliability of the system while increasing percieved performance.</p>
<p>Part of the efficiency enhancements included updates to <span app-skill="${S.SqlServer}">Stored Procedure</span> queries, joins, and reduced response object sizes. To enhance security and user experience, I implemented a one‑time‑password authentication flow using <span app-skill="${S.DotNetCore}">.NET Core</span> middleware and prerequest filters along with <span app-skill="${S.Redis}">Redis</span> caching. These additions modernized the login process and provided users with flexible, secure sign‑in options. I also introduced subtle interface animations—including page‑transition effects and calendar fly‑ins—to create a smoother, more polished interaction model throughout the application.</p>
`;

const egiftDescription = `<p>My company's original eGift card system was solid but extremely antequated in structure, technology (built in Angular 5) and UI. A returning enterprise client wary of coming back given their extremely high volume of online gift card transactions triggered a 5-alarm-fire response from leadership. A tiger-team was formed to quickly rebuild the entire eGift system in <span app-skill="${S.Angular}">Angular 16</span> with absolutely no change to the APIs in order to prevent legacy disruptions.</p>
<p>The previous system did not make adequate use of <span app-skill="${S.RxJs}">Reactive patterns, Observables and Subjects</span> which we were able to rearchitect in the new application and properly implement <span app-skill="${S.NgRx}">NgRx state management</span>. In addition, I implemented a complex carousel component that dynamically builds any Angular component type that is passed into it for a seamless, yet efficient, infinite scroll experience making heavy use of <span app-skill="${S.RxJs}">Behavior Subjects and Observables</span>.</p>
<p>Part of the eGift system is choosing from a series of predefined card templates & images or user-uploaded templates. By integrating with <span app-skill="${S.Aws}">S3 storage APIs</span> and using the Canvas API, we were able to enhance both the file upload and the fetch / display experience increasing speed.</p>
`;

const customBrandingDescription = `<p>One of the major pain-points for our clientelle was the confusing Custom Branding interface and its lackluster consumption in end-user facing applications (like Online Booking). On my own initiative, I decided to consolidate the bulky and excessive multi-tab format that had seemingly duplicated settings and to overhaul the persistence architecture. Instead of storing these settings in our monolith relational DB, I used <span app-skill="${S.Aws}">S3 buckets</span> to store a JSON file of the entire settings object. This allowed us to add and remove settings without having to update database entries or middle tier models & logic.</p>
<p>The previous settings maintenance forms were written in AngularJS and had ineffecient and antequated image upload components. I rebuilt the settings screen in <span app-skill="${S.Angular}">Angular 16</span> including numerous multiple-inheritence components. I rebuilt an image upload tool with cropping functionality using JavaScript Blob API (in <span app-skill="${S.TypeScript}">, </span>), <span app-skill="${S.RxJs}">RxJs observables and subjects</span> along with a streamlined set of <span app-skill="${S.DotNetCore}">new endpoints</span> in our <span app-skill="${S.Aws}">S3 API</span> interface.</p>
<p>I also integrated with Google Fonts and created a combination <span app-skill="${S.RxJs}">dropdown/search interface</span> for users to search the entire Google Font catalog and apply it as the main font for the end-user-facing web apps. In addition to this, I rebuilt the "background" component which allows users to upload a background image or use gradients. I added a new feature allowing finer control over the gradients as well as adding the ability for users to <span app-skill="${S.Aws}">upload</span> a seamless tile image that presents as a patterned background.</p>
<p>Finally, I created an embedded live-view of the end-user eGift application that dynamically updated when the user would change any given setting allowing for instantaneous feedback. The live-vew was embedded using an <span app-skill="${S.TypeScript}">iframe</span> communicating with the main app via post-messages. Included with this was also the ability for users to obtain a preview link that would load the eGift site live using the new settings but without exposing them to general users. Only after publishing the changes would the general public see them. I used <span app-skill="${S.Redis}">Redis caching</span> to temporarily store the JSON settings object using a Guid key which is included in the app's URL parameters.</span>
`

const thisWebsiteDescription = `<p>One of the best ways to show what someone is capable of is by simply doing the thing. I created this website from scratch as an <span app-skill="${S.Angular}">Angular SPA</span> making heavy use of <span app-skill="${S.RxJs}">RxJs and Reactive patterns</span> and a clean, organized codebase. The site reacts to user's browser settings for light / dark theme using a blend of CSS variables and <span app-skill="${S.Scss}">SCSS functions and variables</span></p>
<p>Making use of the <span app-skill="${S.TypeScript}">Animation API</span> to provide flair and style, the site is meant to represent my ability to generate designs, requirements, architecture, and followthru with an elegant and organized codebase. Using a combination of <span app-skill="${S.RxJs}">Observables and Behavior Subjects</span>, I created an infinite scroller to display the different projects I've worked on. I integrated HammerJS gesture library to allow for swipe-scrolling on mobile.</p>
<p>The site is also responsive allowing for desktop and mobile viewing. The desktop site displays usage of <span app-skill="${S.Angular}">named routers</span> to alter one portion of the screen (Skills) using a named route while still viewing the main "Projects" route component. The mobile-version hides the projects scroller in a custom built "side drawer" component. While on mobile, skill basic details are displayed in a modified <span app-skill="${S.Angular}">Angular Material</span> dialog.</p>
`

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public readonly projects: PortfolioProject[];
  public readonly toggleSlideout$: BehaviorSubject<void>  = new BehaviorSubject<void>(undefined);

  private _basicInfosById: { [id in ProjectIdEnum]: ProjectBasicInfo } = {
    [Id.Analytics]: { effortType: 'solo', timespan: { startDate: new Year(2024), endDate: new Year(2025) }, company: Companies.Meevo },
    [Id.ProfessionalPortfolio]: { effortType: 'solo', timespan: { startDate: new Year(2026) } },
    [Id.OnlineBooking]: { effortType: 'lead', timespan: { startDate: new Year(2025), endDate: new Year(2026) }, company: Companies.Meevo, website: 'https://na2.meevo.com/CustomerPortal/advanced-ob/appointment-details?tenantId=500000&locationId=500001' },
    [Id.EGift]: { effortType: 'team', timespan: { startDate: new Year(2024), endDate: new Year(2025) }, company: Companies.Meevo, website: 'https://na2.meevo.com/CustomerPortal/egift?tenantId=500000&locationId=500001' },
    [Id.Scheduler]: { effortType: 'lead', timespan: { startDate: new Year(2024) }, company: Companies.Meevo },
    [Id.CustomBranding]: { effortType: 'solo', timespan: { startDate: new Year(2024) }, company: Companies.Meevo },
    [Id.Security]: { effortType: 'lead', timespan: { startDate: new Year(2025), endDate: new Year(2026) }, company: Companies.Meevo },
    [Id.MultiTenantData]: { effortType: 'team', timespan: { startDate: new Year(2023), endDate: new Year(2026) }, company: Companies.Meevo }
  }
  
  private _projects: Partial<PortfolioProject>[] = [
      { id: Id.Analytics, title: 'Online Analytics', svgIcon: 'project-analytics', skillIds: [S.Angular, S.NgRx, S.GoogleAnalytics] },
      { id: Id.ProfessionalPortfolio, title: 'This Website', svgIcon: 'this_website', skillIds: [S.Angular, S.RxJs, S.TypeScript, S.Scss, S.AzureDevOps], description: thisWebsiteDescription },
      { id: Id.OnlineBooking, title: 'Online Booking', svgIcon: 'project-online-booking', skillIds: [S.CSharp, S.DotNetCore, S.Angular, S.NgRx, S.RxJs, S.Scss, S.SqlServer, S.Redis, S.AzureDevOps], description: onlineBookingDescription },
      { id: Id.EGift, title: 'eGift Cards', svgIcon: 'project-egift', skillIds: [S.Angular, S.NgRx, S.RxJs, S.Aws, S.Scss], description: egiftDescription },
      { id: Id.Scheduler,  title: 'Scheduling & Time Clock', svgIcon: 'project-schedule-system', skillIds: [S.Angular, S.NgRx, S.RxJs, S.Scss, S.SqlServer] },
      { id: Id.CustomBranding, title: 'Custom Branding', svgIcon: 'project-custom-branding', skillIds: [S.CSharp, S.DotNetCore, S.Redis, S.Angular, S.NgRx, S.RxJs, S.Aws], description: customBrandingDescription },
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

  toggleProjectSlideout() {
    this.toggleSlideout$.next();
  }
}
