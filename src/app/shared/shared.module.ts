import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
  UtilitiesModule,
  ModalModule,
  ToastModule,
  PaginationModule,
  BreadcrumbModule
} from '@coreui/angular';

// Components
import { FormFieldComponent } from './components/form-field/form-field.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ErrorBoundaryComponent } from './components/error-boundary/error-boundary.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

// Services
import { NotificationsService } from './components/notifications/notifications.service';

const components = [
  FormFieldComponent,
  AlertComponent,
  LoadingSpinnerComponent,
  ButtonComponent,
  CardComponent,
  TableComponent,
  ModalComponent,
  BreadcrumbComponent,
  PaginationComponent,
  EmptyStateComponent,
  ConfirmDialogComponent,
  ErrorBoundaryComponent,
  NotificationsComponent
];

const modules = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  IconModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
  UtilitiesModule,
  ModalModule,
  ToastModule,
  PaginationModule,
  BreadcrumbModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    ...components
  ],
  exports: [
    ...modules,
    ...components
  ],
  providers: [
    IconSetService,
    NotificationsService
  ]
})
export class SharedModule { } 