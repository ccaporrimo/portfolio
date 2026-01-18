import { Component, HostBinding, signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { VerticalScrollerComponent } from "../ui/vertical-scroller/vertical-scroller.component";
import { SideDrawerComponent } from "../ui/side-drawer/side-drawer.component";
import { CommonModule } from '@angular/common';
import { VerticalScrollerItem } from '../../interfaces/vertical-scroller.interface';
import { AnimationHelpers, BrowserHelpers } from '../../services/helpers';
import { SkillService } from '../../services/skill.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  imports: [RouterOutlet, VerticalScrollerComponent, SideDrawerComponent, CommonModule]
})
export class MainContentComponent {  
  @ViewChild('sideDrawer') sideDrawer!: SideDrawerComponent;

  private _fadeTiming: number = 250;
  @HostBinding('style.--main-panel-fade-timing')
  fadeTiming: string = `${this._fadeTiming}ms`;

  protected isDesktop = signal(false);
  protected fadeOut: boolean = false;
  protected skillItems: VerticalScrollerItem[];
  protected projectItems: VerticalScrollerItem[];

  constructor(private _router: Router, private _skillService: SkillService, private _projectService: ProjectService) {
    this.updateIsDesktop();
    window.addEventListener('resize', () => this.updateIsDesktop());
    this.skillItems = this._skillService.skills;
    this.projectItems = this._projectService.projects;
  }

  public skillSelected(item: VerticalScrollerItem) {
    this.sideDrawer?.toggleDrawer();
    this.animateSkillChange([item.route]);
  }

  private animateSkillChange(route: string[]) {
    const drawerDelay = (!!this.sideDrawer ? this.sideDrawer.slideDuration : 0) / 2;
    const { deferredTimeout } = AnimationHelpers;
    deferredTimeout(() => this.fadeOut = true, drawerDelay).then(_ => deferredTimeout(() => { this.fadeOut = false; this._router.navigate(route) }, this._fadeTiming));
  }

  private updateIsDesktop() {    
    this.isDesktop.set(!BrowserHelpers.isMobile());
  }
}
