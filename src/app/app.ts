import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { FooterComponent } from './components/footer/footer.component';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly profileTitle = 'Christian Caporrimo';
  protected readonly profileSubtitle = 'Software Engineer | Systems Architect | UX-Driven Designer';
  protected readonly profileSubtitleParts = this.profileSubtitle.split(' | ');
  protected readonly currentYear = new Date().getFullYear();

  constructor(private _themeService: ThemeService, private _iconService: IconService) {
    this._themeService.init();
    this._iconService.init();
  }


}
