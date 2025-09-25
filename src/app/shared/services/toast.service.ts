import { Injectable, signal } from '@angular/core';
import { ToastConfig, ToastData } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<ToastData[]>([]);
  public readonly toasts$ = this.toasts.asReadonly();

  showToast(config: ToastConfig): string {
    const id = this.generateId();
    const toast: ToastData = {
      id,
      config: {
        duration: 1500,
        showCloseButton: true,
        closeButtonText: 'Got it',
        ...config
      },
      isVisible: false,
      isRemoving: false
    };

    this.toasts.update(toasts => [...toasts, toast]);

    setTimeout(() => {
      this.updateToastVisibility(id, true);
    }, 100);

    if (toast.config.duration && toast.config.duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, toast.config.duration);
    }

    return id;
  }

  removeToast(id: string): void {
    this.updateToastRemoving(id, true);

    setTimeout(() => {
      this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
    }, 400);
  }

  private updateToastVisibility(id: string, isVisible: boolean): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id ? { ...toast, isVisible } : toast
      )
    );
  }

  private updateToastRemoving(id: string, isRemoving: boolean): void {
    this.toasts.update(toasts =>
      toasts.map(toast =>
        toast.id === id ? { ...toast, isRemoving, isVisible: false } : toast
      )
    );
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}