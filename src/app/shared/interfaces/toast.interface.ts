export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  showCloseButton?: boolean;
  closeButtonText?: string;
}

export interface ToastData {
  id: string;
  config: ToastConfig;
  isVisible: boolean;
  isRemoving: boolean;
}