import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '@coreui/angular';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, PaginationModule],
  template: `
    <c-pagination
      [align]="align"
      [size]="size"
      [class]="customClass"
    >
      <c-pagination-item
        *ngIf="showFirstLast"
        [disabled]="currentPage === 1"
        (click)="onPageChange(1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </c-pagination-item>
      <c-pagination-item
        [disabled]="currentPage === 1"
        (click)="onPageChange(currentPage - 1)"
      >
        <span aria-hidden="true">&lsaquo;</span>
      </c-pagination-item>
      <ng-container *ngFor="let page of pages">
        <c-pagination-item
          *ngIf="page !== '...'"
          [active]="page === currentPage"
          (click)="onPageChange(page)"
        >
          {{ page }}
        </c-pagination-item>
        <c-pagination-item
          *ngIf="page === '...'"
          disabled
        >
          {{ page }}
        </c-pagination-item>
      </ng-container>
      <c-pagination-item
        [disabled]="currentPage === totalPages"
        (click)="onPageChange(currentPage + 1)"
      >
        <span aria-hidden="true">&rsaquo;</span>
      </c-pagination-item>
      <c-pagination-item
        *ngIf="showFirstLast"
        [disabled]="currentPage === totalPages"
        (click)="onPageChange(totalPages)"
      >
        <span aria-hidden="true">&raquo;</span>
      </c-pagination-item>
    </c-pagination>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::ng-deep .pagination {
      margin-bottom: 0;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showFirstLast = true;
  @Input() customClass = '';
  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= halfVisiblePages + 1) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - halfVisiblePages) {
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - maxVisiblePages + 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = this.currentPage - halfVisiblePages; i <= this.currentPage + halfVisiblePages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
} 