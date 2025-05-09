import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalModule],
  template: `
    <c-modal
      [visible]="visible"
      [size]="size"
      [backdrop]="backdrop"
      [keyboard]="keyboard"
      [scrollable]="scrollable"
      (visibleChange)="onVisibleChange($event)"
    >
      <c-modal-header>
        <h5 cModalTitle>{{ title }}</h5>
        <button
          cButtonClose
          [disabled]="!closeable"
          (click)="onClose()"
        ></button>
      </c-modal-header>
      <c-modal-body>
        <ng-content></ng-content>
      </c-modal-body>
      <c-modal-footer *ngIf="showFooter">
        <button
          cButton
          color="secondary"
          variant="ghost"
          (click)="onClose()"
        >
          {{ cancelText }}
        </button>
        <button
          cButton
          [color]="confirmColor"
          (click)="onConfirm()"
          [disabled]="confirmDisabled"
        >
          {{ confirmText }}
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
export class ModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';
  @Input() backdrop: boolean | 'static' = true;
  @Input() keyboard = true;
  @Input() scrollable = true;
  @Input() closeable = true;
  @Input() showFooter = true;
  @Input() confirmText = 'تأكيد';
  @Input() cancelText = 'إلغاء';
  @Input() confirmColor: 'primary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() confirmDisabled = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onVisibleChange(visible: boolean): void {
    this.visibleChange.emit(visible);
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
} 