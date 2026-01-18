import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill.interface';
import { SkillTypeEnum } from '../constants/skill.constants';

const S = SkillTypeEnum;

@Injectable({ providedIn: 'root' })
export class SkillService {
  public readonly skills: Skill[] = [
    { id: S.Aws, imageUrl: '/assets/images/skills/512px-Amazon_Web_Services_Logo.png', route: '/skills/aws', title: 'AWS' },
    { id: S.CSharp, imageUrl: '/assets/images/skills/csharp-128.png', route: '/skills/c-sharp', title: 'C#', tooltip: 'C# language' },
    { id: S.DotNetCore, imageUrl: '/assets/images/skills/NET_Core_Logo.svg', route: '/skills/dot-net-core', title: '.NET Core', tooltip: '.NET Core framework & APIs' },
    { id: S.Angular, imageUrl: '/assets/images/skills/angular_gradient.png', route: '/skills/angular', title: 'Angular', tooltip: 'Angular framework' },
    { id: S.SqlServer, imageUrl: '/assets/images/skills/Microsoft_SQL_Server_2025_icon.svg', route: '/skills/sql-server', title: 'SQL Server', tooltip: 'Microsoft SQL Server database' },
    { id: S.NgRx, imageUrl: '/assets/images/skills/ngrx-logo.svg', route: '/skills/ngrx', title: 'NgRx', tooltip: 'NgRx state management' },
    { id: S.Redis, imageUrl: '/assets/images/skills/redis-icon.svg', route: '/skills/redis', title: 'Redis' },  
    { id: S.Scss, imageUrl: '/assets/images/skills/Sass.png', route: '/skills/scss', title: 'SCSS' },
    { id: S.RxJs, imageUrl: '/assets/images/skills/Rx_Logo-512-512.png', route: '/skills/rxjs', title: 'RxJs & Reactive' },
    { id: S.TypeScript, imageUrl: '/assets/images/skills/ts-logo-256.png', route: '/skills/typescript', title: 'TypeScript', tooltip: 'TypeScript language' },  
    { id: S.AzureDevOps, imageUrl: '/assets/images/skills/Azure-DevOps.svg', route: '/skills/azure-devops', title: 'Azure DevOps' },
  ];

  constructor() { }

  public readonly getSkillByRouteParam = (routeParam: string) => {
    const key = `/skills/${routeParam}`;
    return this.skills.find(s => s.route === key);
  }

  public readonly getSkillImageByRouteParam = (routeParam: string) => {
    return this.getSkillByRouteParam(routeParam)?.imageUrl;
  }

}
