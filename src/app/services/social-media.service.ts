import { Injectable } from '@angular/core';
import { SocialMediaLink } from '../interfaces/ui.interface';

@Injectable({ providedIn: 'root' })
export class SocialMediaService {

  public readonly socialMediaLinks: SocialMediaLink[] = [
    { label: 'LinkedIn', imageUrl: '/assets/images/LI-In-Bug.png', linkUrl: 'https://www.linkedin.com/in/christian-caporrimo/' },
    { label: 'Indeed', imageUrl: '/assets/images/Indeed_2021_Icon_RGB_White.svg', linkUrl: 'https://profile.indeed.com/p/christianc-5sb33z0' }
  ]

  constructor() { }

}
