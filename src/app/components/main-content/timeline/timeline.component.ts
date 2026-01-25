import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, HostBinding, OnInit } from '@angular/core';
import { TimelineNode, TimelineNodeBranch } from '../../../interfaces/timeline-node.interface';
import { BrowserHelpers, Year } from '../../../services/helpers';
import { MatIcon } from "@angular/material/icon";

const fBranchHeight = 'var(--full-branch-height)';
const tBranchHeight = 'var(--timeline-branch-height)';
const { isMobile } = BrowserHelpers;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  imports: [NgClass, DatePipe, MatIcon, NgTemplateOutlet]
})
export class TimelineComponent implements OnInit {
  @ViewChild('timeline') timelineElRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('timelineBranch') timelineBranchElRef!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('imageEl') imageElRefs!: QueryList<ElementRef<HTMLElement>>;

  @HostBinding('style.--timeline-total-height')
  timelineTotalHeight: string = '90%';

  public timelineNodes: TimelineNode[] = [
    { imgSrc: 'assets/images/history/us_navy.png', year: new Year(2004) },
    { imgSrc: 'assets/images/Logo_of_New_Jersey_Institute_of_Technology.png', year: new Year(2012) },
    { imgSrc: 'assets/images/history/atc_logo.png', year: new Year(2013) },
    { imgSrc: 'assets/images/history/atc_new_logo.png', year: new Year(2015) },
    { imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2018) },
    { imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2019), badgeIcon: 'code_icon' },
    { imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2021), badgeIcon: 'rocket_ship' },
    { imgSrc: 'assets/images/meevo-powered-by-millennium-logo-wht-nav.svg', year: new Year(2024), badgeIcon: 'architecture' },
  ]
  public branches: TimelineNodeBranch[] = this.timelineNodes.map((node, idx) => ({ ...node, id: idx, position: idx+1, isHovered: false }));

  private _defaultOptions: KeyframeAnimationOptions = { duration: 150, easing: 'ease-in', fill: 'none' };
  private _timelineAnim: Animation | null = null;
  private _branchAnim: Animation | null = null;
  private _animGen = 0;

  private get _timelineEl() { return this.timelineElRef?.nativeElement; }
  private get _el() { return this._elRef.nativeElement as HTMLElement; }

  constructor(private _elRef: ElementRef) { }

  ngOnInit(): void {
    const fbh = fBranchHeight;
    const tbh = tBranchHeight;
    this.timelineTotalHeight = `max(calc(${this.branches.length} * (30px + ${fbh})), 90%)`;
  }

  public animateHover(branch: TimelineNodeBranch, idx: number): void {
    this._animGen++;
    const gen = this._animGen;

    this.cancelAllAnimations();

    const { id, position } = branch;
    this._timelineAnim = this.animateTimeline(position);
    this._timelineAnim.finished.then(() => {
      if (gen !== this._animGen) return;

      // const extraHeight = isMobile() ? `${fBranchHeight} + ${tBranchHeight}` : `(${fBranchHeight}/2) + (${tBranchHeight}/2)`
      const extraHeight = isMobile() ? '33px' : `22px`;
      this._timelineEl.style.setProperty('height', `calc(${position * 30}px + ${fBranchHeight} * ${idx} + ${extraHeight})`);
      this._branchAnim = this.animateBranch(id, 100);
      branch.isHovered = true;
      this._branchAnim.finished.then(() => {
        if (gen !== this._animGen) return;        
        this.getTimelineBranchElById(id)?.nativeElement.style.setProperty('width', '100%');
        this.getTimelineImageByIndex(idx)?.classList.add('focus');
      });
    }).catch(() => {});
  }

  public animateUnhover(): void {
    this._animGen++;
    const gen = this._animGen;

    this.imageElRefs.forEach(elRef => elRef.nativeElement.classList.remove('focus'));

    if (!this._branchAnim) {
      this.reverseTimeline(gen);
      return;
    }

    this._branchAnim.reverse();
    this._branchAnim.finished.finally(() => {
      if (gen !== this._animGen) return;
      this.resetBranchStyles();
      this.reverseTimeline(gen);
    });
  }

  private reverseTimeline(gen: number) {
    if (!this._timelineAnim) return;

    this._timelineAnim.reverse();
    this._timelineAnim.finished.finally(() => {
      if (gen !== this._animGen) return;
      this.cancelAllAnimations();
    });
  }

  private cancelAllAnimations() {
    this._timelineAnim?.cancel();
    this._branchAnim?.cancel();
    this.resetTimelineStyles();
    this.resetBranchStyles();
    this._timelineAnim = null;
    this._branchAnim = null;
  }

  private resetTimelineStyles() {
    this._timelineEl?.style.removeProperty('height');
  }

  private resetBranchStyles() {
    this.branches.forEach(b => b.isHovered = false);
    this.timelineBranchElRef.forEach(ref => ref.nativeElement.style.removeProperty('width'));
  }

  private animateTimeline(position: number, options: KeyframeAnimationOptions = this._defaultOptions): Animation {
    const branchHeight = getComputedStyle(this._el).getPropertyValue('--timeline-branch-height').trim();
    const keyframes: Keyframe[] = [
      { height: '0%' },
      { height: `calc(${position * 30}px + ${branchHeight})` }
    ];
    return this._timelineEl.animate(keyframes, options);
  }

  private animateBranch(id: number, widthInPercent: number, options: KeyframeAnimationOptions = this._defaultOptions): Animation {
    const keyframes: Keyframe[] = [
      { width: '0%' },
      { width: `${widthInPercent}%` }
    ];
    const branchEl = this.getTimelineBranchElById(id);
    if (!branchEl) throw new Error(`Timeline branch element with id ${id} not found`);
    return branchEl.nativeElement.animate(keyframes, {...options, easing: 'ease-out'});
  }

  private getTimelineBranchElById(id: number) {
    const idx = this.branches.findIndex(b => b.id === id);
    return this.timelineBranchElRef.get(idx);
  }

  private getTimelineImageByIndex(idx: number) {
    return this.imageElRefs.get(idx)?.nativeElement;
  }
}