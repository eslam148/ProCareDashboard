import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="login-container">
      <app-loading [isLoading]="loading$ | async"></app-loading>
      
      <div class="login-form">
        <h2>تسجيل الدخول</h2>
        
        <div *ngIf="error$ | async as error" class="alert alert-danger">
          {{ error }}
        </div>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">اسم المستخدم</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              class="form-control"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              class="form-control"
              required
            >
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="(loading$ | async)">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }
    .btn {
      width: 100%;
      padding: 0.75rem;
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit() {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
} 