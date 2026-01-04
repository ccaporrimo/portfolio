import { Injectable } from '@angular/core';
import { iconDefinitions } from '../constants/icon.constants';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconService {

  constructor(private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) { }

  public init(): void {
    this.registerIcons();    
  }

  private registerIcons(): void {
    Object.keys(iconDefinitions).forEach(iconName => this._iconRegistry.addSvgIcon(iconName, this._sanitizer.bypassSecurityTrustResourceUrl(iconDefinitions[iconName])));
  }
}
