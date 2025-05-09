import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { filter, map, tap, delay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { environment } from '../environments/environment';
import { CookieService } from './services/cookie.service';
import { AuthServicesService } from '../Services/auth-services.service';
import { checkAuth } from './store/auth/auth.actions';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  providers: [AuthServicesService]
})
export class AppComponent implements OnInit {
  title = 'CoreUI Angular Admin Template';
  isLoading = false;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(
    private store: Store,
    private cookieService: CookieService,
    private authService: AuthServicesService
  ) {
    this.#titleService.setTitle(this.title);
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    this.isLoading = true;
    const token = this.cookieService.getCookie(environment.TOKEN_KEY);
    if (token) {
      this.authService.setToken(token);
      this.store.dispatch(checkAuth());
    }

    this.#router.events.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isLoading = false;
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
