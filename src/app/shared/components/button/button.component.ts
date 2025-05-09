import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  template: `
    <button
      cButton
      [color]="color"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled || loading"
      (click)="onClick($event)"
      [class]="customClass"
    >
      <app-loading-spinner
        *ngIf="loading"
        [small]="true"
        [message]="loadingText"
      ></app-loading-spinner>
      <ng-content *ngIf="!loading"></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  `]
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() variant: 'outline' | 'ghost' | 'link' = 'outline';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = 'جاري التحميل...';
  @Input() customClass = '';
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
} 