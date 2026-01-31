import { SafeHtml } from "@angular/platform-browser";
import { TimelineIdEnum } from "../constants/history.constants";
import { Year } from "../services/helpers";

export interface TimelineNode {
    id: TimelineIdEnum;
    imgSrc: string;
    badgeIcon?: string;
    year: Date;
    nodeDetail?: TimelineNodeDetail;
    route?: string;
}

export interface TimelineNodeDetail {
    title: string;
    fullDescription: string | SafeHtml;
    yearRange: { start?: Year, end?: Year };
    jobTitle?: string;
    degree?: string;
    awards?: string[];
}

export interface TimelineNodeBranch extends TimelineNode {
    position: number;
    isHovered: boolean;
    heightInPx?: number;
}