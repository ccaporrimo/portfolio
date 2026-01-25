export interface TimelineNode {
    imgSrc: string;
    badgeIcon?: string;
    year: Date;
}

export interface TimelineNodeBranch extends TimelineNode {
    id: number;
    position: number;
    isHovered: boolean;
}