export interface VerticalScrollerItem {
    id?: string;
    imageUrl?: string;
    svgIcon?: string;
    title: string;
    route: string;
    tooltip?: string;
}

export type ScrollDirection = 'up' | 'down';