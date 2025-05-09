import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from './notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications = new BehaviorSubject<Notification[]>([]);

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  show(notification: Omit<Notification, 'id'>): void {
    const id = uuidv4();
    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, { ...notification, id }]);
  }

  success(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'success',
      message,
      title,
      duration
    });
  }

  error(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'danger',
      message,
      title,
      duration
    });
  }

  warning(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'warning',
      message,
      title,
      duration
    });
  }

  info(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'info',
      message,
      title,
      duration
    });
  }

  remove(id: string): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(n => n.id !== id));
  }

  clear(): void {
    this.notifications.next([]);
  }
} 