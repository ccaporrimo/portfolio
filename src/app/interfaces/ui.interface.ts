export interface MenuItem {
    id?: string; // assigned by menu component
    route?: string[];
    action?: () => void;
    label: string;
    svgIcon: string;
}

export interface SocialMediaLink {
    label: string;
    imageUrl?: string;
    svgIcon?: string;
    linkUrl: string;
}