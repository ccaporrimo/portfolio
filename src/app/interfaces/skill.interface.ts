import { VerticalScrollerItem } from "./vertical-scroller.interface";

export interface SkillBasicInfo {
    yearsExperience: number;
    skillLevel: number;
    skillLevelDesc: string;
    currency: string;
}

export interface Skill extends VerticalScrollerItem {
    basicInfo?: SkillBasicInfo;
}
