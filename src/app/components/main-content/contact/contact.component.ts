import { Component, ElementRef, signal, WritableSignal } from '@angular/core';
import { ContactFormField, ContactMePayload } from '../../../interfaces/contact.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { catchError, map, of, take, tap } from 'rxjs';
import { LoadingSpinnerComponent } from "../../ui/loading-spinner/loading-spinner.component";
import { AnimationHelpers } from '../../../services/helpers';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [FormsModule, LoadingSpinnerComponent, ReactiveFormsModule]
})
export class ContactComponent {
  protected form: FormGroup;
  protected isSending: WritableSignal<boolean> = signal(false);
  protected isSuccess: WritableSignal<boolean | null> = signal(null);

  protected readonly payload: ContactMePayload = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    isRecruiter: false,
    messageSubject: '',
    message: ''
  }

  protected readonly formFields: ContactFormField[] = [
    { name: 'firstName', label: 'First name', type: 'text', isRequired: true, validators: [Validators.required] },
    { name: 'lastName', label: 'Last name', type: 'text', isRequired: true, validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', isRequired: true, validators: [Validators.required, Validators.email] },
    { name: 'company', label: 'Company', type: 'text', isRequired: false },
    { name: 'isRecruiter', label: 'I am a recruiter', type: 'checkbox', isRequired: false },
    { name: 'message', label: 'Message', type: 'textarea', isRequired: true, validators: [Validators.required] }
  ];
  
  private get _el() { return this._elRef?.nativeElement as HTMLElement; }

  constructor(private _dataService: DataService, private _elRef: ElementRef) {
    this.form = new FormGroup([]);
    this.formFields.forEach(ff => {
      const newControl = new FormControl('', ff.validators ?? []);
      this.form.addControl(ff.name, newControl);
    });
  }

  sendContact() {
    const { firstName, lastName, email, company, message } = this.payload;
    if (!firstName || !lastName || !this.isValidEmail(email) || !company || !message) {
      return;
    }

    this._dataService.sendEmail(this.payload).pipe(
      take(1),
      map(res => !!res),
      catchError(_ => of(false))
    ).subscribe(result => this.processSendResult(result));
  }

  private processSendResult(result: boolean) {    
    this.isSending.set(false);
    if (!result) {
      this.isSuccess.set(false);
      return;
    }

    const formEl = this._el.querySelector('form') as HTMLFormElement;
    AnimationHelpers.fadeOut$(formEl, 1000).subscribe(_ => this.isSuccess.set(true));
  }

  private _emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  private isValidEmail(email: string) {
    return this._emailRegex.test(email);
  }
}
