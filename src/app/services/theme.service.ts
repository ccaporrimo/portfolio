import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public init() {
    this.setBaseFontSize();
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
