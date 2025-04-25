import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
 
  CardBodyComponent,
  CardComponent,
 
  ColComponent,
 
  RowComponent,
  TableDirective,
  TextColorDirective,
  AvatarComponent

} from '@coreui/angular';
import { Admin, AdminItem } from '../../app/Model/AdminItem';
import { PaginatedResponse } from '../../app/Model/PaginatedResponse';
import { AdminResponse } from '../../app/Model/AdminResponse';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JavaScript

@Component({
  selector: 'app-show-admins',
  imports: [FormsModule,AvatarComponent,CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, TableDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to allow custom elements
  templateUrl: './show-admins.component.html',
  styleUrl: './show-admins.component.scss'
})
export class ShowAdminsComponent implements OnInit {
  admins: AdminResponse = { data: { items: [] }, totalCount: 0, pageSize: 0, currentPage: 0 }; // Initialize with default values
  selectedAdmin: Admin | null = null; // Store the admin to be deleted
  currentPage: number = 0;
  pageSize: number = 5;
  Math = Math;
  searchQuery: string = ''; // Holds the search query for filtering admins
  originalAdmins: Admin[] = []; // Store the original list of admins

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAllAdmins(this.currentPage, this.pageSize,this.searchQuery).subscribe((response) => {
      console.log(response); // Log the response for debugging
      this.admins = response; // Assign the response directly to admins
      this.originalAdmins = [...response.data.items]; // Store the original list of admins
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadAdmins();
  }

  openDeleteModal(user: Admin) {
    this.selectedAdmin = user;
    const modalElement = document.getElementById('deleteConfirmModal');
    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }

  confirmDelete() {
    if (this.selectedAdmin) {
      this.adminService.deleteAdmin(this.selectedAdmin.id).subscribe(() => {
        alert(`${this.selectedAdmin?.firstName} ${this.selectedAdmin?.lastName} has been deleted.`);
        this.loadAdmins(); // Reload the list after deletion
        this.selectedAdmin = null; // Clear the selected admin
      });
    }
  }

  deleteAdmin(user: Admin) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      // this.adminService.deleteAdmin(user.id).subscribe(() => {
      //   alert(`${user.firstName} ${user.lastName} has been deleted.`);
      //   this.loadAdmins(); // Reload the list after deletion
      // });
    }
  }

  filterAdmins() {
    if (this.searchQuery.trim() === '') {
      // If search query is empty, reset to original admins list
    //  this.admins.data.items = [...this.originalAdmins];
      this.loadAdmins()
    } else {
      // Filter admins based on the search query
      // this.admins.data.items = this.originalAdmins.filter(admin =>
      //   admin.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
      // );
      this.loadAdmins(); // Reload the admins with the search query
    }
  }
}
