import { Component, OnInit } from '@angular/core';
import { ParamRouteComponentBase } from '../../param-route.component.base';
import { TimelineNode } from '../../../interfaces/timeline-node.interface';
import { HistoryService } from '../../../services/history.service';
import { DatePipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  imports: [DatePipe, MatIcon]
})
export class HistoryDetailComponent extends ParamRouteComponentBase<TimelineNode> implements OnInit {  
  constructor(private _historyService: HistoryService) {
    super('timelineId');
  }

  protected override getItemByRouteParam = (id: string): TimelineNode | undefined => {
    return this._historyService.timelineNodesById[id];
  }
}
