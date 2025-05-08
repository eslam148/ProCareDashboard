import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../Services/location.service';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  AvatarComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalFooterComponent,
  ModalBodyComponent,
  SpinnerComponent

} from '@coreui/angular';
import { LocationCity, LocationGovernorate } from '../../app/Model/Locaton';
import { set } from 'lodash-es';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    RowComponent,
    TableDirective,
    TextColorDirective,
    ModalComponent,
    ModalHeaderComponent,
    // ModalTitleDirective,
    ModalFooterComponent,
    ModalBodyComponent,
    SpinnerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  isLoading: boolean = false;
  ListGovernorate: LocationGovernorate[] = [];
  ListCity: LocationCity[] = [];
  AddModalVisible: boolean = false;
  DeleteModalVisible: boolean = false;
  selectedEntity: any | null = null;
  GovernorateForm: FormGroup;
  ModalVisible: boolean = false; // Tracks whether the modal is visible
  isEditMode: boolean = false; // Tracks whether the form is in edit mode
  CityModalVisible: boolean = false; // Tracks whether the city modal is visible
  DeleteCityModalVisible: boolean = false; // Tracks the visibility of the delete city modal
  AddCityModalVisible: boolean = false; // Tracks the visibility of the add city modal
  isEntityGovernorate: boolean = true; // Tracks whether the entity is Governorate or City

  constructor(private LocationService: LocationService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.GovernorateForm = this.fb.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllGovernorate();
  }

  onSubmitCity() {
    console.log(this.isEditMode);
    if (this.GovernorateForm.valid) {
      const formData = this.GovernorateForm.value;
      console.log('Form Data:', formData);
      formData.governorateId = this.selectedEntity ? this.selectedEntity.id : 0; // Set ID for update or 0 for new governorate
      this.isLoading = true;

      this.LocationService.AddLocationsCity(formData).subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        this.getAllGovernorate();
        this.AddCityModalVisible = false;
      }, (error) => {
        console.error('Error adding governorate:', error);
        this.isLoading = false;
      });
    }
  }

  ShowAddCity(id: number) {
    this.AddCityModalVisible = true;
    this.selectedEntity = null;
    this.GovernorateForm.reset(); // Reset the form fields
    this.selectedEntity = this.ListGovernorate.find(g => g.id === id) || null;
  }

  handleAddCityModalChange(event: boolean): void {
    this.AddCityModalVisible = event;
  }

  handleCityModalChange(event: boolean): void {
    this.CityModalVisible = event;
  }

  handleDeleteCityModalChange(event: boolean): void {
    this.DeleteCityModalVisible = event;
  }

  getAllGovernorate() {
    this.isLoading = true;
    this.LocationService.getAllLocationsGovernorate().subscribe((res) => {
      this.ListGovernorate = res.data;
      console.log(this.ListGovernorate);
      console.log(res);
      this.isLoading = false;
      console.log(this.ListGovernorate);
    }, (error) => {
      console.error('Error fetching governorates:', error);
      this.isLoading = false;
    });
  }

  getAllCities(governorateId: number): void {
    this.isLoading = true;
    this.LocationService.getAllLocationsCites(governorateId).subscribe(
      (res: any) => {
        this.ListCity = res.data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching cities:', error);
        this.isLoading = false;
      }
    );
  }

  ShowCityCategory(id: number) {
    this.isLoading = true;
    this.LocationService.getCityByGovernorateId(id).subscribe((res) => {
      this.ListCity = res.data;
      this.isLoading = false;
      this.CityModalVisible = true;
      console.log(this.ListCity);
    }, (error) => {
      console.error('Error fetching cities:', error);
      this.isLoading = false;
    });
  }

  closecityModal() {
    this.CityModalVisible = false; // Close the city modal
  }

  closeComfirm(): void {
    this.DeleteModalVisible = false;
    this.DeleteCityModalVisible = false;
  }

  showAddGovernorateModal() {
    this.isEditMode = false; // Set to add mode
    this.ModalVisible = true;
    this.selectedEntity = null; // Reset selected governorate for adding a new one
    this.GovernorateForm.reset(); // Reset the form fields
    this.isEditMode = false; // Reset selected governorate for adding a new one
  }

  showAddCityModal(): void {
    this.isEditMode = false; // Set to add mode
    this.CityModalVisible = true;
    this.selectedEntity = null; // Reset selected city for adding a new one
    this.GovernorateForm.reset(); // Reset the form fields
  }

  toggleConfirmDelete(id: number, isGovernorate: boolean): void {
    this.DeleteModalVisible = true; // Show the delete confirmation modal
    this.isEntityGovernorate = isGovernorate;
    this.selectedEntity = isGovernorate
      ? this.ListGovernorate.find((g) => g.id === id) || null
      : this.ListCity.find((c) => c.id === id) || null;

    if (!this.selectedEntity) {
      console.error('Error: Entity not found.');
    }
  }

  confirmDelete(): void {
    this.isLoading = true;
    if (this.selectedEntity) {
      const deleteObservable = this.isEntityGovernorate
        ? this.LocationService.DeleteLocationsGovernorate(this.selectedEntity.id)
        : this.LocationService.DeleteLocationsCity(this.selectedEntity.id);

      deleteObservable.subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.isEntityGovernorate ? this.getAllGovernorate() : this.getAllCities(this.selectedEntity?.id);
          this.DeleteModalVisible = false;
        },
        (error) => {
          console.error('Error deleting entity:', error);
          this.isLoading = false;
        }
      );
    }
  }

  showEditModal(entity: any, isGovernorate: boolean): void {
    this.isEditMode = true;
    this.isEntityGovernorate = isGovernorate;
    this.selectedEntity = entity;
    this.GovernorateForm.patchValue({
      nameAr: entity.nameAr,
      nameEn: entity.nameEn,
    });
    this.ModalVisible = isGovernorate;
    this.CityModalVisible = !isGovernorate;
  }

  showEditCityModal(city: any): void {
    this.isEditMode = true;
    this.isEntityGovernorate = false;
    this.selectedEntity = city;
    this.GovernorateForm.patchValue({
      nameAr: city.nameAr,
      nameEn: city.nameEn,
    });
    this.CityModalVisible = true;
  }

  handleDeleteModalChange(event: boolean): void {
    this.DeleteModalVisible = event;
  }

  handleAddModalChange(event: boolean): void {
    this.AddModalVisible = event;
  }

  handleModalChange(event: boolean): void {
    this.ModalVisible = event;
  }

  onSubmit(): void {
    console.log(this.isEditMode);

    if (this.GovernorateForm.valid) {
      const formData = this.GovernorateForm.value;
      formData.id = this.selectedEntity ? this.selectedEntity.id : 0; // Set ID for update or 0 for new governorate
      console.log('Form Data:', formData);
      this.isLoading = true;
      if (this.isEditMode && this.selectedEntity) {
        this.LocationService.UpdateLocationsGovernorate(formData).subscribe((res) => {
          console.log(res);
          this.isLoading = false;
          this.getAllGovernorate();
          this.ModalVisible = false;
        }, (error) => {
          console.error('Error adding governorate:', error);
          this.isLoading = false;
        });
      } else {
        this.LocationService.AddLocationsGovernorate(formData).subscribe((res) => {
          console.log(res);
          this.isLoading = false;
          this.getAllGovernorate();
          this.ModalVisible = false;
        }, (error) => {
          console.error('Error updating governorate:', error);
          this.isLoading = false;
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
