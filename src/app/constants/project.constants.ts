import { Company } from "../interfaces/project.interface";

export enum ProjectIdEnum {
    Analytics = 'analytics',
    OnlineBooking = 'online-booking',
    EGift = 'egift',
    Scheduler = 'scheduler',
    CustomBranding = 'custom-branding',
    Security = 'security',
    MultiTenantData = 'multi-tenant-data',    
}

export namespace Companies {
    export const Meevo: Company = {
        name: 'Meevo',
        url: 'https://www.meevo.com'
    }
}
