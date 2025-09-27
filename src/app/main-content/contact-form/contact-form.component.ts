import { Component, Input, inject} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Translation } from '../../shared/interfaces/translation.interface';
import { ToastService } from '../../shared/services/toast.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { TranslationService } from '../../shared/services/translation.service';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { ScrollService } from '../../shared/services/scroll.service';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule, 
    RouterModule, 
    CommonModule, 
    TranslatePipe, 
    ToastComponent,
    SlideAnimationComponent
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @Input() translation!: Translation['sections']['contact'];

  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private translationService = inject(TranslationService);
    private scrollService = inject(ScrollService);

  
  /**
   * Scrolls the page to the top with smooth behavior.
   */
  scrollToTop() {
    this.scrollService.scrollToTop();
  }
  
  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  hoveredCheckbox: string | null = null;
  mailTest = false;
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
   * @returns The current translation object
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

  /**
   * Handles form submission and sends contact data to the server.
   * Validates form data, manages submission state, and shows appropriate feedback.
   * In test mode, simulates successful submission without making HTTP request.
   * 
   * @param ngForm - The Angular form reference containing form data and validation state
   */
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
        setTimeout(() => {
          this.showSuccessToast();
          ngForm.resetForm();
          this.contactData.privacy = false;
          this.isSubmitting = false;
        }, 500);
      }
    }
  }

  /**
   * Displays a success toast notification using current translations.
   * @private
   */
  private showSuccessToast(): void {
    this.toastService.showToast({
      message: this.currentTranslations.toast.success.message,
      type: 'success',
      closeButtonText: this.currentTranslations.toast.success.button
    });
  }

  /**
   * Displays an error toast notification using current translations.
   * @private
   */
  private showErrorToast(): void {
    this.toastService.showToast({
      message: this.currentTranslations.toast.error.message,
      type: 'error',
      closeButtonText: this.currentTranslations.toast.error.button
    });
  }
  
}
