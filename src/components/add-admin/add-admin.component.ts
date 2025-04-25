import { AuthServicesService } from 'src/Services/auth-services.service';
import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  imports: [CommonModule, FormsModule, ContainerComponent, RowComponent, ColComponent],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  submitted: boolean = false; // Tracks form submission

  constructor(private authService: AuthServicesService, private router: Router) { }

  onRegister() {
    this.submitted = true; // Mark the form as submitted

    if (!this.firstName.trim() || !this.lastName.trim() || !this.phoneNumber.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      return; // Stop if any field is empty
    }

    if (this.password.length < 6) {
      return; // Stop if password is too short
    }

    if (this.password !== this.confirmPassword) {
      return; // Stop if passwords do not match
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.register(user).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['show-admin']); // Redirect to show-admin on success
      },
      error: (err) => alert('Registration failed: ' + err.message)
    });
  }
}
