import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label [for]="id" class="form-label" *ngIf="label">{{ label }}</label>
      <input
        [type]="type"
        [class]="'form-control ' + (customClass || '')"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [required]="required"
        [disabled]="disabled"
        [ngModel]="value"
        (ngModelChange)="onValueChange($event)"
      >
      <div class="form-text" *ngIf="helpText">{{ helpText }}</div>
      <div class="invalid-feedback" *ngIf="errorMessage">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FormFieldComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() value: any = '';

  onValueChange(value: any) {
    this.value = value;
  }
} 