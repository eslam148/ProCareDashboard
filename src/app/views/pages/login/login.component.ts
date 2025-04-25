import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthServicesService } from '../../../../Services/auth-services.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  phoneNumber:string ="";
  password:string="";
  constructor(private authService: AuthServicesService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirect to '/' if already authenticated
    }
  }

  login(credentials: { phoneNumber: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if(response.status != 1){
        localStorage.setItem('authToken', response.data.token); // Assuming response contains a token
        this.router.navigate(['/']); // Redirect to '/' on successful login
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
