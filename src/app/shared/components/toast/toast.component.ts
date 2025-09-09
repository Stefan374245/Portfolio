import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private toastService = inject(ToastService);
  
  toasts = this.toastService.toasts$;

  closeToast(id: string): void {
    this.toastService.removeToast(id);
  }
}