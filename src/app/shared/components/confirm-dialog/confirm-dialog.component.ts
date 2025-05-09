import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ModalModule],
  template: `
    <c-modal
      [visible]="visible"
      [backdrop]="'static'"
      [keyboard]="false"
      (visibleChange)="onVisibleChange($event)"
    >
      <c-modal-header>
        <h5 cModalTitle>{{ title }}</h5>
      </c-modal-header>
      <c-modal-body>
        <p class="mb-0">{{ message }}</p>
      </c-modal-body>
      <c-modal-footer>
        <button
          cButton
          color="secondary"
          variant="ghost"
          (click)="onCancel()"
          [disabled]="loading"
        >
          {{ cancelText }}
        </button>
        <button
          cButton
          [color]="confirmColor"
          (click)="onConfirm()"
          [disabled]="loading"
        >
          <app-loading-spinner
            *ngIf="loading"
            [small]="true"
            [message]="loadingText"
          ></app-loading-spinner>
          <span *ngIf="!loading">{{ confirmText }}</span>
        </button>
      </c-modal-footer>
    </c-modal>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::ng-deep .modal-header {
      border-bottom: 1px solid #dee2e6;
    }
    ::ng-deep .modal-footer {
      border-top: 1px solid #dee2e6;
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'تأكيد';
  @Input() message = 'هل أنت متأكد من تنفيذ هذا الإجراء؟';
  @Input() confirmText = 'تأكيد';
  @Input() cancelText = 'إلغاء';
  @Input() confirmColor: 'primary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() loading = false;
  @Input() loadingText = 'جاري التنفيذ...';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onVisibleChange(visible: boolean): void {
    this.visibleChange.emit(visible);
  }

  onCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
} 