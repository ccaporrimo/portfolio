import { Component, ViewChild } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { FooterComponent } from './components/footer/footer.component';
import { IconService } from './services/icon.service';
import { CommonModule } from '@angular/common';
import { MenuItem, SocialMediaLink } from './interfaces/ui.interface';
import { SocialMediaService } from './services/social-media.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly profileTitle = 'Christian Caporrimo';
  protected readonly profileSubtitle = 'Software Engineer | Systems Architect | Code Artisan';
  protected readonly profileSubtitleParts = this.profileSubtitle.split(' | ');
  protected readonly currentYear = new Date().getFullYear();
  protected readonly socialMediaLinks: SocialMediaLink[];

  @ViewChild('mainContent') mainContent!: MainContentComponent;

  constructor(private _themeService: ThemeService, private _iconService: IconService, private _socMediaService: SocialMediaService) {
    this._themeService.init();
    this._iconService.init();
    this.socialMediaLinks = _socMediaService.socialMediaLinks;
  }

  protected menuItemSelected(item: MenuItem) {
    !!item?.route && this.mainContent.menuItemSelected(item);
  }

}
