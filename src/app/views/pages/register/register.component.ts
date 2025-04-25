import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthServicesService } from '../../../../Services/auth-services.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [FormsModule,ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthServicesService) { }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    this.authService.register(user).subscribe({
      next: () => alert('Registration successful!'),
      error: (err) => alert('Registration failed: ' + err.message)
    });
  }
}
