import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="error-boundary" *ngIf="hasError">
      <div class="error-boundary-icon">
        <i class="cil-warning"></i>
      </div>
      <h3 class="error-boundary-title">{{ title }}</h3>
      <p class="error-boundary-message">
        {{ error?.message || defaultMessage }}
      </p>
      <button
        cButton
        color="primary"
        (click)="onRetry()"
      >
        {{ retryText }}
      </button>
    </div>
    <ng-content *ngIf="!hasError"></ng-content>
  `,
  styles: [`
    :host {
      display: block;
    }
    .error-boundary {
      text-align: center;
      padding: 2rem;
    }
    .error-boundary-icon {
      font-size: 3rem;
      color: #dc3545;
      margin-bottom: 1rem;
    }
    .error-boundary-title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .error-boundary-message {
      color: #6c757d;
      margin-bottom: 1.5rem;
    }
  `]
})
export class ErrorBoundaryComponent {
  @Input() hasError = false;
  @Input() error: Error | null = null;
  @Input() title = 'حدث خطأ';
  @Input() defaultMessage = 'حدث خطأ غير متوقع';
  @Input() retryText = 'إعادة المحاولة';
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.hasError = false;
    this.error = null;
    this.retry.emit();
  }
} 