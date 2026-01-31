import { Company } from "../interfaces/project.interface";

export enum ProjectIdEnum {
    Analytics = 'analytics',
    OnlineBooking = 'online-booking',
    EGift = 'egift',
    Scheduler = 'scheduler',
    CustomBranding = 'custom-branding',
    Security = 'security',
    BookingAgent = 'booking-agent',
    ProfessionalPortfolio = 'professional-portfolio'
}

export namespace Companies {
    export const Meevo: Company = {
        name: 'Meevo',
        url: 'https://www.meevo.com'
    }
}
