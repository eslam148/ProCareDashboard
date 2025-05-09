import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'overlay': overlay}">
      <div class="spinner-border" [ngClass]="{'spinner-border-sm': small}" role="status">
        <span class="visually-hidden">{{ message }}</span>
      </div>
      <div class="spinner-text" *ngIf="message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .spinner-container.overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
    }
    .spinner-border {
      width: 3rem;
      height: 3rem;
      border: 0.25em solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spinner-border 0.75s linear infinite;
    }
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
      border-width: 0.2em;
    }
    .spinner-text {
      margin-top: 0.5rem;
      color: #666;
    }
    @keyframes spinner-border {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'جاري التحميل...';
  @Input() small: boolean = false;
  @Input() overlay: boolean = false;
} 