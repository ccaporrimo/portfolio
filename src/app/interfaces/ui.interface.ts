export interface MenuItem {
    id?: string; // assigned by menu component
    route?: string[];
    action?: () => void;
    label: string;
    svgIcon: string;
}