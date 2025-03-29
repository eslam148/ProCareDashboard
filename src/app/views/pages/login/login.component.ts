import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthServicesService } from '../../../../Services/auth-services.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  constructor(private authService: AuthServicesService) { }

  login(credentials: { username: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // localStorage.setItem('authToken', response.token); // Assuming response contains a token
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
