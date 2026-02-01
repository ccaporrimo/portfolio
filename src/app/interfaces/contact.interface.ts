import { ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export interface ContactMePayload {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    isRecruiter: boolean;
    messageSubject?: string;
    message: string;
}

export interface ContactFormField {
    name: keyof ContactMePayload;
    label: string;
    type: 'text' | 'textarea' | 'email' | 'checkbox';
    isRequired: boolean;
    validators?: ValidatorFn[];
}