export interface VerticalScrollerItem {
    imageUrl: string;
    title: string;
    route: string;
    tooltip?: string;
    hovered?: boolean;
}

export type ScrollDirection = 'up' | 'down';