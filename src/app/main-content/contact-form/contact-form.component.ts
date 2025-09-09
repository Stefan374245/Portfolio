import { Component, Input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Translation } from '../../shared/interfaces/translation.interface';
import { ToastService } from '../../shared/services/toast.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, TranslatePipe, ToastComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @Input() translation!: Translation['sections']['contact'];

  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private translationService = inject(TranslationService);
  
  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  hoveredCheckbox: string | null = null;
  mailTest = false; // Set to false for production
  isSubmitting = false;

  post = {
    endPoint: 'https://stefan-helldobler.de/portfolio/sendMail.php',
    body: (payload: any) => JSON.stringify(payload), 
    options: {
      headers: {
        'Content-Type': 'application/json',
        responseType: 'text',
      },
    },
  };

  /**
   * Getter für aktuelle Übersetzungen (wie im Header)
   */
  get currentTranslations(): Translation {
    return this.translationService.getCurrentTranslations();
  }

  /**
   * Setzt den Hover-State für Checkbox-Elemente
   * @param checkboxId - ID der gehöverten Checkbox
   */
  setHoveredCheckbox(checkboxId: string | null): void {
    this.hoveredCheckbox = checkboxId;
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: (response) => {
              this.showSuccessToast();
              ngForm.resetForm();
              this.contactData.privacy = false;
              this.isSubmitting = false;
            },
            error: (error) => {
              console.error(error);
              this.showErrorToast();
              this.isSubmitting = false;
            },
            complete: () => console.info('send post complete'),
          });
      } else if (this.mailTest && this.contactData.privacy) {
        // Test mode - show toast immediately for testing
        setTimeout(() => {
          this.showSuccessToast();
          ngForm.resetForm();
          this.contactData.privacy = false;
          this.isSubmitting = false;
        }, 500);
      }
    }
  }

  private showSuccessToast(): void {
    this.toastService.showToast({
      message: this.currentTranslations.toast.success.message,
      type: 'success',
      closeButtonText: this.currentTranslations.toast.success.button
    });
  }

  private showErrorToast(): void {
    this.toastService.showToast({
      message: this.currentTranslations.toast.error.message,
      type: 'error',
      closeButtonText: this.currentTranslations.toast.error.button
    });
  }
}
