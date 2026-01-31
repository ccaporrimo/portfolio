export interface ContactMePayload {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    isRecruiter: boolean;
    messageSubject?: string;
    message: string;
}