import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="'btn ' + (variant || 'btn-primary') + ' ' + (size || '') + ' ' + (customClass || '')"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      [type]="type || 'button'">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'btn-primary' | 'btn-secondary' | 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-info' | 'btn-light' | 'btn-dark' = 'btn-primary';
  @Input() size: 'btn-sm' | 'btn-lg' | '' = '';
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<Event>();
} 