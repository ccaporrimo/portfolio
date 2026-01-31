import { Injectable } from '@angular/core';
import { TimelineNode, TimelineNodeBranch, TimelineNodeDetail } from '../interfaces/timeline-node.interface';
import { Year } from './helpers';
import { TimelineIdEnum } from '../constants/history.constants';
import { DomSanitizer } from '@angular/platform-browser';

const Id = TimelineIdEnum;

const navyDesc = 'Served 4 years in the United States Navy in the Nuclear program. I attended A-school for Electronics Technician and Nuclear Power school to train as a Reactor Technician. I was the first to qualify in my class at Nuclear Prototype school in Saratoga Springs, NY where we trained on a fully functioning nuclear reactor. After completing qualifications, I spent the remainder of my time in the Navy in the Submarine Fleet on SSN 764 the USS Boise (Los Angeles class fast attack sub) as a Reactor Technician.'
const njitDesc = '2 year masters program. Graduated with a 3.85 GPA.';
const atcQaDesc = 'After having spent my last summer during grad school as an intern for ATC, I was hired full time as a Software QA Analyst. I analyzed user stories and functional requirements in order to generate and run test cases. I created bugs and defects in JIRA tracking system and started to implement test automation scripts in Selenium before transitioning into the Business Analyst role.';
const atcBaDesc = 'Considered a promotion after having proven my ability to analyze data in SQL Server and understand technical needs and limitations along with an ability to communicate with higher levels of management, I was moved to the Business Analyst position at ATC. The primary project we were working on was an internal inventory tracking and transfer system for the Aerospace division. I worked closely with the PO illiciting requirements and discussing technical limitations and solution design. I wrote user stories, acceptance criteria, and provided design wireframes in Balsamiq also performing UAT testing.';
const msiBaDesc = `<p>I was brought into MSI as a Business Analyst after having cut my teeth as the sole BA for the ATC Aerospace project. The Meevo2 SaaS product hadn\'t been launched yet when I was brought on board. I was embedded with a team of veteran developers who were about halfway thru implementing the first Online Booking system. However, the team lead left and shortly after two more developers separated leaving myself and two developers. I picked up Angular 5 and dove into C# (putting my prior Java skills to work) while still maintaining my BA duties. I was able to assist the team in completing Online Booking on time (while also refactoring some of the prior developers\' code.
<p>Before the Online Booking system was completed, the remaining team members were dispersed into other existing teams. I brought the remainder of Online Booking with me to the new team and completed the work there. I continued to put my development skills to work performing root cause analyses in all layers of the code while also maintaining my requirements illicitation and Acceptance Criteria authoring duties.</p>`;
const msiDevDesc = `<p>When an opportunity to move into Engineering presented itself, I jumped at the chance. Having seen my abilities in analysis and technical implementation, one of the Team Leads brought me on as a full stack Software Developer. I worked primarily on the Register feature, Credit Card transactions, Appointment Book, and "Booking Agent" features</p>
<p>The "Booking Agent" was my first feature I professionally worked on. The lead was told by another team lead (who was responsible for the app's custom Security functionality) that one of the requirements for the Booking Agent wasn't feasible. Namely, to dynamically refresh the user's security permissions when they changed locations within the Agent. I researched and found a solution that was approved by the Security team and my lead.`;
const msiSrDevDesc = `<p>After proving my adaptability, technical skills in both analyzing complex bugs, doing root cause analysis and researching complex solutions, I was promoted to Senior Engineer. I continued to dive further and further into more complex code bases particularly in the API layer and new microservice architecture that the company began to adopt. I also took it upon myself to write some complex Powershell scripts that alleviated the pain of having to perform long DB refreshes when reprioritizations caused frequent branch-changing.</p>`
const msiLeadDesc = `<p>My perserverence, dedication to clean maintainable code, and ability to quickly become adept in new technologies as well as my ability to see and analyze across the architecture landed me a promotion to lead the team I was formerly a BA for. I took the reigns of finalizing the second Online Booking system, completing a long-standing never-finished employee Scheduling project (refactoring much of it for performance and scalability concerns), and lead implementation a new Online Membership Purchasing system.
<p>I also self-initiated several POC projects all of which turned into official company features and initiatives. One of them being the third iteration of Online Booking but also full refactor of the APIs for all customer portal applications and beginning to separate these into siloed services that I plan to move fully into a microservice architecture.`;

@Injectable({ providedIn: 'root' })
export class HistoryService {
  public readonly branches: TimelineNodeBranch[];
  public readonly timelineNodes: TimelineNode[];
  public readonly timelineNodesById: { [key: string]: TimelineNode };

  private _detailById: { [key in TimelineIdEnum]: TimelineNodeDetail } = {
    [Id.USNavy]: { fullDescription: navyDesc, yearRange: { end: new Year(2004) }, title: 'United States Navy', jobTitle: 'ETN2 - Nuclear Reactor Technician', awards: ['Distinguished Service Medal', 'Honorable Discharge'] },
    [Id.Njit]: { fullDescription: njitDesc, yearRange: { start: new Year(2011), end: new Year(2013) }, title: 'New Jersey Institute of Technology', degree: 'Master of Science in Computer Science' },
    [Id.AtcQa]: { fullDescription: atcQaDesc, yearRange: { start: new Year(2013), end: new Year(2015) }, title: 'Argo Turboserve', jobTitle: 'Software QA Analyst' },
    [Id.AtcBa]: { fullDescription: atcBaDesc, yearRange: { start: new Year(2015), end: new Year(2018) }, title: 'ATC - Aerospace', jobTitle: 'Business Analyst' },
    [Id.MsiBa]: { fullDescription: msiBaDesc, yearRange: { start: new Year(2018), end: new Year(2019) }, title: 'Millennium Systems International', jobTitle: 'Business Analyst' },
    [Id.MsiDev]: { fullDescription: msiDevDesc, yearRange: { start: new Year(2019), end: new Year(2021) }, title: 'Millennium Systems International', jobTitle: 'Software Developer' },
    [Id.MsiSrDev]: { fullDescription: msiSrDevDesc, yearRange: { start: new Year(2021), end: new Year(2024) }, title: 'Millennium Systems International', jobTitle: 'Sr. Software Engineer', awards: ['Promotion'] },
    [Id.MsiLead]: { fullDescription: msiLeadDesc, yearRange: { start: new Year(2024) }, title: 'Millennium Systems International', jobTitle: 'Team Lead Software Architect', awards: ['Promotion'] }
  }

  private _timelineNodes: TimelineNode[] = [
    { id: Id.USNavy, imgSrc: 'assets/images/history/us_navy.png', year: new Year(2004) },
    { id: Id.Njit, imgSrc: 'assets/images/Logo_of_New_Jersey_Institute_of_Technology.png', year: new Year(2012) },
    { id: Id.AtcQa, imgSrc: 'assets/images/history/atc_logo.png', year: new Year(2013) },
    { id: Id.AtcBa, imgSrc: 'assets/images/history/atc_new_logo.png', year: new Year(2015) },
    { id: Id.MsiBa, imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2018) },
    { id: Id.MsiDev, imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2019), badgeIcon: 'code_icon' },
    { id: Id.MsiSrDev, imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2021), badgeIcon: 'rocket_ship' },
    { id: Id.MsiLead, imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2024), badgeIcon: 'architecture' },
  ];  

  constructor(private _sanitizer: DomSanitizer) {
    this.timelineNodes = this._timelineNodes.map(node => ({
      ...node,
      nodeDetail: { ...this._detailById[node.id as TimelineIdEnum], fullDescription: _sanitizer.bypassSecurityTrustHtml(this._detailById[node.id as TimelineIdEnum].fullDescription as string)},
      route: `/history/${node.id}`
    }));

    this.timelineNodesById = this.timelineNodes.reduce((agg, node) => ({ ...agg, [node.id]: node }), {});
    this.branches = this.timelineNodes.map((node, idx) => ({ ...node, position: idx+1, isHovered: false }));
  }

  public getTimelineNodeDetail(id: TimelineIdEnum) {
    return this._detailById[id];
  }
  
}
