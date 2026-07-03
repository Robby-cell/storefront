interface Toast {
  id: number;
  message: string;
}

class ToastState {
  toasts = $state<Toast[]>([]);

  add(message: string) {
    const id = Date.now();
    this.toasts.push({ id, message });
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }, 3000);
  }
}

export const toast = new ToastState();
