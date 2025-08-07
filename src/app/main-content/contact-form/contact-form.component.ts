import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, TranslatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  };

  hoveredCheckbox: string | null = null;
  mailTest = false;

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
   * Setzt den Hover-State für Checkbox-Elemente
   * @param checkboxId - ID der gehöverten Checkbox
   */
  setHoveredCheckbox(checkboxId: string | null): void {
    this.hoveredCheckbox = checkboxId;
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      //das ist nur fuer den test im localHost
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData)) // auf dem server klappt es dann
        .subscribe({
          // die subscribe Methode ist notwendig, um die Anfrage zu senden
          next: (response) => {
            // die Antwort des Servers wird hier verarbeitet
            // hier kann ich alles moegliche implementieren, z.B. eine Erfolgsmeldung anzeigen
            ngForm.resetForm(); // das Formular wird nach dem Absenden geleert
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'), // optional, um zu sehen, dass die Anfrage abgeschlossen ist
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest && this.contactData.privacy) {
      ngForm.resetForm();
      this.contactData.privacy = false; // Reset checkbox explicitly
    }
  }
}
