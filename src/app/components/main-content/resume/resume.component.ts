import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  imports: [DatePipe, MatIcon]
})
export class ResumeComponent implements OnInit {
  protected readonly today: Date = new Date();
  protected readonly resumeUrl: SafeResourceUrl;

  private readonly _resumeUrl: string = '/assets/docs/ccaporrimo_resume_2026.pdf';

  constructor(sanitizer: DomSanitizer) {
    this.resumeUrl = sanitizer.bypassSecurityTrustResourceUrl(this._resumeUrl);
  }

  ngOnInit() {
  }

}
