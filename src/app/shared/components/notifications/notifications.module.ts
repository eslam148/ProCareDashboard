import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from '@coreui/angular';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './notifications.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class NotificationsModule { } 