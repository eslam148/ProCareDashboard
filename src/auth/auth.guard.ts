import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../Services/auth-services.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isAuthenticated()) {
    return true;  // Allow the route access
  } else {
    // If not logged in, redirect to login page
    router.navigate(['/login']);
    return false;  // Deny route access
  }
};
