import { Injectable } from '@angular/core';
import { ColorVariables } from '../../constants';
import { ColorHelpers } from './helpers';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly _colorSchemeDarkMatch = window.matchMedia('(prefers-color-scheme: dark)');

  public init() {
    this.setBaseFontSize();
    this.setDarkMode(this._colorSchemeDarkMatch.matches);
    this._colorSchemeDarkMatch.addEventListener('change', e => this.setDarkMode(e.matches));
  }

  private setDarkMode(isDarkMode: boolean): void {
    const root = document.documentElement;
    const primaryDark = getComputedStyle(root).getPropertyValue(ColorVariables.colorPrimaryDark).trim();
    const primaryLight = getComputedStyle(root).getPropertyValue(ColorVariables.colorPrimaryLight).trim();

    const primary = isDarkMode ? primaryDark : primaryLight;
    root.style.setProperty(ColorVariables.colorPrimary500, primary);
    root.style.setProperty(ColorVariables.colorPrimary300, ColorHelpers.lightenColor(primary, 5));
    root.style.setProperty(ColorVariables.colorPrimary100, ColorHelpers.lightenColor(primary, 10));
  }

  private setBaseFontSize(): void {
    const targetFont = window.getComputedStyle(document.documentElement).getPropertyValue('--body-font-family').split(',')[0].replace(/['"]/g, '').trim();

    const phantomEl = document.createElement('span');
    phantomEl.style.fontFamily = 'Arial';
    phantomEl.style.fontSize = '100px'; // 100 for precision
    phantomEl.style.position = 'absolute';
    phantomEl.style.visibility = 'hidden';
    phantomEl.style.padding = '0';
    phantomEl.style.margin = '0';
    phantomEl.innerText = 'x';

    document.body.appendChild(phantomEl);
    const referenceHeight = phantomEl.offsetHeight;

    phantomEl.style.fontFamily = targetFont;
    document.fonts.load(`100px ${targetFont}`).then(() => {
      const targetHeight = phantomEl.offsetHeight;
      const scaleFactor = referenceHeight / targetHeight;
      document.documentElement.style.setProperty('--base-font-size', `${scaleFactor.toFixed(3)}rem`);
      document.body.removeChild(phantomEl);
    });
  }

}
