import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { 
  CardModule, 
  GridModule, 
  ButtonModule, 
  FormModule, 
  InputGroupComponent, 
  InputGroupTextDirective, 
  FormControlDirective,
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../store/auth/auth.selectors';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        GridModule,
        ButtonModule,
        FormModule,
        InputGroupComponent,
        InputGroupTextDirective,
        FormControlDirective,
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
        IconModule,
        LoadingComponent
    ]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading$;
    error$;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private router: Router
    ) {
        this.loading$ = this.store.select(selectAuthLoading);
        this.error$ = this.store.select(selectAuthError);
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit(): void {
        this.error$.subscribe(error => {
            if (error) {
                this.loginForm.enable();
            }
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loginForm.disable();
            const { username, password } = this.loginForm.value;
            this.store.dispatch(AuthActions.login({ username, password }));
        }
    }
}
