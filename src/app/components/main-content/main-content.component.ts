import { Component, ElementRef, HostBinding, signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { VerticalScrollerComponent } from "../ui/vertical-scroller/vertical-scroller.component";
import { SideDrawerComponent } from "../ui/side-drawer/side-drawer.component";
import { CommonModule } from '@angular/common';
import { VerticalScrollerItem } from '../../interfaces/vertical-scroller.interface';
import { AnimationHelpers, BrowserHelpers } from '../../services/helpers';
import { SkillService } from '../../services/skill.service';
import { ProjectService } from '../../services/project.service';
import { MenuItem } from '../../interfaces/ui.interface';
import { of } from 'rxjs';
import { ResizeableComponentBase } from '../resizeable.component.base';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  imports: [RouterOutlet, VerticalScrollerComponent, SideDrawerComponent, CommonModule]
})
export class MainContentComponent extends ResizeableComponentBase {  
  @ViewChild('sideDrawer') sideDrawer!: SideDrawerComponent;
  @ViewChild('routerContainer') routerContainerRef!: ElementRef<HTMLElement>;

  private _fadeTiming: number = 250;
  @HostBinding('style.--main-panel-fade-timing')
  fadeTiming: string = `${this._fadeTiming}ms`;

  protected fadeOut: boolean = false;
  protected skillItems: VerticalScrollerItem[];
  protected projectItems: VerticalScrollerItem[];

  private get _routerContainerEl() { return this.routerContainerRef?.nativeElement; }

  constructor(private _router: Router, private _skillService: SkillService, private _projectService: ProjectService) {
    super();
    this.skillItems = this._skillService.skills;
    this.projectItems = this._projectService.projects;
    this._projectService.toggleSlideout$.subscribe(_ => this.sideDrawer?.toggleDrawer());
  }

  public verticalScrollerItemSelected(item: VerticalScrollerItem) {
    this.animateRouteChange([item.route]);
  }

  public menuItemSelected(menuItem: MenuItem) {
    if (!menuItem?.route?.length) return;
        
    this.animateRouteChange(menuItem.route);
  }

  private animateRouteChange(route: string[]) {
    const { slideLeft$, slideInFromRight$ } = AnimationHelpers;

    const closeDrawer$ = this.sideDrawer?.closeDrawer$() ?? of(void 0);
    closeDrawer$.subscribe(() => {
      const el = this._routerContainerEl;
      if (!el) return;
      slideLeft$(el, '100%', this._fadeTiming).subscribe(() => {
        this._router.navigate(route);
        slideInFromRight$(el, '100%', this._fadeTiming).subscribe();
      });
    });
  }
}
