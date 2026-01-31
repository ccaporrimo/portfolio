import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { BrowserHelpers } from '../../services/helpers';
import { HeaderMenuComponent } from "../ui/header-menu/header-menu.component";
import { MenuItem } from '../../interfaces/ui.interface';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [HeaderMenuComponent]
})
export class HeaderComponent {
  @Input() profileTitle!: string;
  @Input() profileSubtitleParts!: string[];
  @Output() headerMenuItemSelected: EventEmitter<MenuItem> = new EventEmitter();

  public readonly menuItems: MenuItem[] = [
    { label: "Bio", svgIcon: "bio_icon", route: ['/'] },
    { label: "Projects", svgIcon: "projects_icon", action: () => this._projectService.toggleProjectSlideout() },
    { label: "History", svgIcon: "work_history_icon", route: ['timeline'] },
    { label: "Resume", svgIcon: "resume_icon", route: ['resume'] },
    { label: "Contact", svgIcon: "contact_icon", route: ['contact'] }
  ]

  protected isMobile: WritableSignal<boolean> = signal(false);

  constructor(private _projectService: ProjectService) {
    window.addEventListener('resize', () => this.isMobile.set(BrowserHelpers.isMobile()));
    this.isMobile.set(BrowserHelpers.isMobile());
    !this.isMobile() && this.menuItems.splice(this.menuItems.findIndex(i => i.label == 'Projects'), 1);
  }
}
