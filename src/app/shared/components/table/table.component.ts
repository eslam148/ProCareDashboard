import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective, TableHeaderDirective, TableRowDirective, TableCellDirective } from '@coreui/angular';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    TableHeaderDirective,
    TableRowDirective,
    TableCellDirective
  ],
  template: `
    <div class="table-responsive">
      <table cTable [hover]="hover" [striped]="striped" [bordered]="bordered" [small]="small" [class]="customClass">
        <thead>
          <tr>
            <th *ngFor="let header of headers" [class]="header.class">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items; let i = index" (click)="onRowClick(item)">
            <td *ngFor="let header of headers" [class]="header.class">
              {{ item[header.key] }}
            </td>
          </tr>
          <tr *ngIf="items.length === 0">
            <td [attr.colspan]="headers.length" class="text-center">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .table {
      margin-bottom: 0;
    }
    .table th {
      font-weight: 500;
      background-color: #f8f9fa;
    }
    .table td {
      vertical-align: middle;
    }
  `]
})
export class TableComponent {
  @Input() headers: { key: string; label: string; class?: string }[] = [];
  @Input() items: any[] = [];
  @Input() hover = true;
  @Input() striped = true;
  @Input() bordered = false;
  @Input() small = false;
  @Input() customClass = '';
  @Input() emptyMessage = 'لا توجد بيانات';
  @Output() rowClick = new EventEmitter<any>();

  onRowClick(item: any): void {
    this.rowClick.emit(item);
  }
} 