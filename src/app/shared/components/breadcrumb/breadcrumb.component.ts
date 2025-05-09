import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '@coreui/angular';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbModule],
  template: `
    <c-breadcrumb [items]="items" [class]="customClass">
      <ng-template #itemTemplate let-item>
        <a
          *ngIf="item.url"
          [routerLink]="item.url"
          class="breadcrumb-item"
        >
          {{ item.label }}
        </a>
        <span
          *ngIf="!item.url"
          class="breadcrumb-item active"
        >
          {{ item.label }}
        </span>
      </ng-template>
    </c-breadcrumb>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::ng-deep .breadcrumb {
      margin-bottom: 0;
      padding: 0.75rem 0;
    }
    ::ng-deep .breadcrumb-item {
      font-size: 0.875rem;
    }
    ::ng-deep .breadcrumb-item.active {
      color: #6c757d;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: { label: string; url?: string }[] = [];
  @Input() customClass = '';
} 