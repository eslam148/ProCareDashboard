import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../Services/auth-services.service';
import { CommonModule } from '@angular/common';
import { 
  CardBodyComponent, 
  CardComponent, 
  CardHeaderComponent, 
  ColComponent, 
  RowComponent, 
  FormControlDirective, 
  ButtonDirective,
  ContainerComponent
} from '@coreui/angular';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    FormControlDirective,
    ButtonDirective,
    ContainerComponent
  ]
})
export class AddAdminComponent {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServicesService,
    private router: Router
  ) {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.authService.register(this.adminForm.value).subscribe({
        next: () => {
          alert('تم إضافة المشرف بنجاح');
          this.router.navigate(['/dashboard']);
        },
        error: (err: Error) => alert('فشل إضافة المشرف: ' + err.message)
      });
    }
  }
}
