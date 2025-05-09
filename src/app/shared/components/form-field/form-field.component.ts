import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormLabelDirective, FormControlDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { IconModule, IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormLabelDirective,
    FormControlDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconModule,
    IconDirective
  ],
  template: `
    <div class="mb-3">
      <label cFormLabel [for]="id">{{ label }}</label>
      <c-input-group>
        <span cInputGroupText *ngIf="icon">
          <i cIcon [name]="icon"></i>
        </span>
        <input
          cFormControl
          [id]="id"
          [type]="type"
          [formControl]="control"
          [placeholder]="placeholder"
          [ngClass]="{'is-invalid': control.invalid && control.touched}"
        />
      </c-input-group>
      <div class="invalid-feedback" *ngIf="control.errors?.['required'] && control.touched">
        {{ label }} مطلوب
      </div>
      <div class="invalid-feedback" *ngIf="control.errors?.['pattern'] && control.touched">
        {{ patternError }}
      </div>
      <div class="invalid-feedback" *ngIf="control.errors?.['minlength'] && control.touched">
        {{ label }} يجب أن تكون {{ control.errors?.['minlength'].requiredLength }} أحرف على الأقل
      </div>
    </div>
  `,
  styles: [`
    .invalid-feedback {
      display: block;
    }
  `]
})
export class FormFieldComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() patternError: string = '';
} 