import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from '@coreui/angular';

export interface Notification {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: `
    <c-toast
      *ngFor="let notification of notifications"
      [visible]="true"
      [autohide]="notification.duration !== 0"
      [delay]="notification.duration || 5000"
      [color]="notification.type"
      (visibleChange)="onNotificationClose(notification)"
    >
      <c-toast-header>
        <strong class="me-auto">{{ notification.title || getDefaultTitle(notification.type) }}</strong>
        <button
          cButtonClose
          class="btn-close-white"
          (click)="onNotificationClose(notification)"
        ></button>
      </c-toast-header>
      <c-toast-body>
        {{ notification.message }}
      </c-toast-body>
    </c-toast>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1050;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `]
})
export class NotificationsComponent {
  @Input() notifications: Notification[] = [];
  @Output() notificationClose = new EventEmitter<Notification>();

  getDefaultTitle(type: Notification['type']): string {
    switch (type) {
      case 'success':
        return 'نجاح';
      case 'danger':
        return 'خطأ';
      case 'warning':
        return 'تحذير';
      case 'info':
        return 'معلومات';
      default:
        return '';
    }
  }

  onNotificationClose(notification: Notification): void {
    this.notificationClose.emit(notification);
  }
} 