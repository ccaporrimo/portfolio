import { SafeHtml } from "@angular/platform-browser";
import { SkillTypeEnum } from "../constants/skill.constants";
import { Skill } from "./skill.interface";
import { VerticalScrollerItem } from "./vertical-scroller.interface";

export type EffortType = 'solo' | 'team' | 'lead'

export interface ProjectBasicInfo {
    timespan?: { startDate: Date, endDate?: Date };
    company?: Company;
    website?: string;
    effortType: EffortType;
}

export interface PortfolioProject extends VerticalScrollerItem {
    basicInfo?: ProjectBasicInfo;
    description?: string | SafeHtml;
    shortDescription?: string;
    skillIds?: SkillTypeEnum[];
    skills?: Skill[];
}

export interface Company {
    name: string;
    url?: string;
}