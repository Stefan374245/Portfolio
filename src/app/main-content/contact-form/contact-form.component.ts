import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {

blurredFields = new Set<string>();

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  onFieldBlur(fieldName: string) {
    this.blurredFields.add(fieldName);
  }

  isFieldBlurred(fieldName: string): boolean {
    return this.blurredFields.has(fieldName);
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactData[fieldName as keyof typeof this.contactData];
    
    switch (fieldName) {
      case 'name':
        return !field || field.trim().length < 2;
      case 'email':
        const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        return !field || !emailPattern.test(field);
      case 'message':
        return !field || field.trim().length < 4;
      default:
        return false;
    }
  }

  isFieldValid(fieldName: string): boolean {
    return this.isFieldBlurred(fieldName) && !this.isFieldInvalid(fieldName);
  }

  shouldShowError(fieldName: string): boolean {
    return this.isFieldBlurred(fieldName) && this.isFieldInvalid(fieldName);
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.contactData);
    }
  }
}
