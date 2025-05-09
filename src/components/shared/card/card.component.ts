import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class]="customClass">
      <div class="card-header" *ngIf="header">
        <ng-container *ngTemplateOutlet="header"></ng-container>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="footer">
        <ng-container *ngTemplateOutlet="footer"></ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() header: any;
  @Input() footer: any;
  @Input() customClass: string = '';
} 