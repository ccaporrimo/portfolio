import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill.interface';

@Injectable({ providedIn: 'root' })
export class SkillService {
  public readonly skills: Skill[] = [
    { imageUrl: '/assets/images/512px-Amazon_Web_Services_Logo.png', route: '/skills/aws', title: 'AWS' },
    { imageUrl: '/assets/images/csharp-128.png', route: '/skills/c-sharp', title: 'C#', tooltip: 'C# language' },
    { imageUrl: '/assets/images/NET_Core_Logo.svg', route: '/skills/dot-net-core', title: '.NET Core', tooltip: '.NET Core framework & APIs' },
    { imageUrl: '/assets/images/angular_gradient.png', route: '/skills/angular', title: 'Angular', tooltip: 'Angular framework' },
    { imageUrl: '/assets/images/Microsoft_SQL_Server_2025_icon.svg', route: '/skills/sql-server', title: 'SQL Server', tooltip: 'Microsoft SQL Server database' },
    { imageUrl: '/assets/images/ngrx-logo.svg', route: '/skills/ngrx', title: 'NgRx', tooltip: 'NgRx state management' },
    { imageUrl: '/assets/images/redis-icon.svg', route: '/skills/redis', title: 'Redis' },  
    { imageUrl: '/assets/images/Sass.png', route: '/skills/scss', title: 'SCSS' },
    { imageUrl: '/assets/images/Rx_Logo-512-512.png', route: '/skills/rxjs', title: 'RxJs & Reactive' },
    { imageUrl: '/assets/images/ts-logo-256.png', route: '/skills/typescript', title: 'TypeScript', tooltip: 'TypeScript language' },  
    { imageUrl: '/assets/images/Azure-DevOps.svg', route: '/skills/azure-devops', title: 'Azure DevOps' },
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
