import { SafeHtml } from "@angular/platform-browser";
import { SkillTypeEnum } from "../constants/skill.constants";
import { Skill } from "./skill.interface";
import { VerticalScrollerItem } from "./vertical-scroller.interface";

export interface ProjectBasicInfo {
    timespan?: { startDate: Date, endDate?: Date };
    company?: Company;
    website?: string;
    soloEffort: boolean;
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