import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, HostBinding, OnInit, signal, WritableSignal } from '@angular/core';
import { TimelineNodeBranch } from '../../../interfaces/timeline-node.interface';
import { BrowserHelpers } from '../../../services/helpers';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../ui/skill-dialog/skill-dialog.component';
import { HistoryService } from '../../../services/history.service';
import { TimelineIdEnum } from '../../../constants/history.constants';
import { Router } from '@angular/router';
import { HistoryDetailDialogComponent } from '../../ui/history-detail-dialog/history-detail-dialog.component';

const fBranchHeight = 'var(--full-branch-height)';
const tBranchHeight = 'var(--timeline-branch-height)';
const { isMobile } = BrowserHelpers;
const extraHeight = isMobile() ? '33px' : `22px`;

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

  public branches: TimelineNodeBranch[];

  protected currentBranch: WritableSignal<TimelineNodeBranch | null> = signal(null);
  protected currentBranchIdx: number | null = null;
  protected fBranchHeight = fBranchHeight;
  protected extraHeight = extraHeight;

  private _animDuration = 150;
  private _defaultOptions: KeyframeAnimationOptions = { duration: this._animDuration, easing: 'ease-in', fill: 'none' };
  private _timelineAnim: Animation | null = null;
  private _branchAnim: Animation | null = null;
  private _animGen = 0;  

  private get _timelineEl() { return this.timelineElRef?.nativeElement; }
  private get _el() { return this._elRef.nativeElement as HTMLElement; }

  constructor(private _elRef: ElementRef, private _dialog: MatDialog, private _historyService: HistoryService, private _router: Router) {
    this.branches = this._historyService.branches;
  }

  ngOnInit(): void {
    const fbh = fBranchHeight;
    const tbh = tBranchHeight;
    this.timelineTotalHeight = `max(calc(${this.branches.length} * (30px + ${fbh})), 90%)`;
  }

  public animateHover(idx: number, allowMobile: boolean = false) {
    if (isMobile() && !allowMobile) return Promise.resolve();
    const branch = this.branches[idx];
    this._animGen++;
    const gen = this._animGen;

    this.cancelAllAnimations();

    const { id, position } = branch;
    this._timelineAnim = this.animateTimeline(position);
    return this._timelineAnim.finished.then(() => {
      if (gen !== this._animGen) return;
      
      this.stampTimelineEl(position, idx);
      this._branchAnim = this.animateBranch(id, 100);
      branch.isHovered = true;
      this._branchAnim.finished.then(() => {
        if (gen !== this._animGen) return;        
        this.stampTimelineBranchEl(id);
        this.getTimelineImageByIndex(idx)?.classList.add('focus');
      });
    }).catch(() => {});
  }

  public animateUnhover(): void {
    this._animGen++;
    const gen = this._animGen;

    this.imageElRefs.forEach((elRef, idx) => idx != this.currentBranchIdx && elRef.nativeElement.classList.remove('focus'));

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

  public openNode(idx: number) {
    const branch = this.branches[idx];
    this.currentBranchIdx = idx;
    this.currentBranch.set(branch);
    setTimeout(() => {
      if (isMobile()) {
        this._dialog.open(HistoryDetailDialogComponent, {
          width: '100svw',
          data: branch
        });
        return;
      }
      
      this._router.navigate([{ outlets: { rightpanel: ['history', branch.id] } }]);
    }, 300);
  }

  private stampTimelineEl(position: number, idx: number) {
    this._timelineEl.style.setProperty('height', `calc(${position * 30}px + ${fBranchHeight} * ${idx} + ${extraHeight})`);
  }

  private stampTimelineBranchEl(id: TimelineIdEnum) {
    this.getTimelineBranchElById(id)?.nativeElement.style.setProperty('width', '100%');
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

  private animateBranch(id: TimelineIdEnum, widthInPercent: number, options: KeyframeAnimationOptions = this._defaultOptions): Animation {
    const keyframes: Keyframe[] = [
      { width: '0%' },
      { width: `${widthInPercent}%` }
    ];
    const branchEl = this.getTimelineBranchElById(id);
    if (!branchEl) throw new Error(`Timeline branch element with id ${id} not found`);
    return branchEl.nativeElement.animate(keyframes, {...options, easing: 'ease-out'});
  }

  private getTimelineBranchElById(id: TimelineIdEnum) {
    const idx = this.branches.findIndex(b => b.id === id);
    return this.timelineBranchElRef.get(idx);
  }

  private getTimelineImageByIndex(idx: number) {
    return this.imageElRefs.get(idx)?.nativeElement;
  }
}