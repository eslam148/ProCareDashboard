import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="empty-state" [class]="customClass">
      <div class="empty-state-icon">
        <i [class]="icon"></i>
      </div>
      <h3 class="empty-state-title">{{ title }}</h3>
      <p class="empty-state-description">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .empty-state {
      text-align: center;
      padding: 2rem;
    }
    .empty-state-icon {
      font-size: 3rem;
      color: #6c757d;
      margin-bottom: 1rem;
    }
    .empty-state-title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .empty-state-description {
      color: #6c757d;
      margin-bottom: 1.5rem;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = 'cil-inbox';
  @Input() title = 'لا توجد بيانات';
  @Input() description = 'لم يتم العثور على أي بيانات متاحة';
  @Input() customClass = '';
} 