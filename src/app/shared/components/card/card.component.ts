import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent as CoreCard, CardHeaderComponent, CardBodyComponent, CardFooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    CoreCard,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent
  ],
  template: `
    <c-card [class]="customClass">
      <c-card-header *ngIf="title || subtitle">
        <h4 class="card-title mb-0">{{ title }}</h4>
        <div class="small text-medium-emphasis" *ngIf="subtitle">{{ subtitle }}</div>
      </c-card-header>
      <c-card-body>
        <ng-content></ng-content>
      </c-card-body>
      <c-card-footer *ngIf="footer">
        {{ footer }}
      </c-card-footer>
    </c-card>
  `,
  styles: [`
    :host {
      display: block;
    }
    .card {
      margin-bottom: 1rem;
    }
    .card-title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
  `]
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() footer = '';
  @Input() customClass = '';
} 