import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../Services/location.service';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalFooterComponent,
  ModalBodyComponent,
  SpinnerComponent,
  ButtonDirective,
  CardModule,
  FormModule,
  GridModule,
  ButtonModule,
  TableModule
} from '@coreui/angular';
import { LocationCity, LocationGovernorate } from '../../app/Model/Locaton';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { IconModule } from '@coreui/icons-angular';

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    ModalBodyComponent,
    SpinnerComponent,
    ButtonDirective,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    IconModule,
    FormModule,
    GridModule,
    ButtonModule,
    TableModule,
    CardBodyComponent,
    CardHeaderComponent,
    TableDirective
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isLoading = false;
  loadingMessage = '';
  
  governorates: LocationGovernorate[] = [];
  cities: LocationCity[] = [];
  selectedGovernorateId: number | null = null;
  
  governorateForm: FormGroup;
  cityForm: FormGroup;
  
  showGovernorateModal = false;
  showCityModal = false;
  showDeleteModal = false;
  isEditing = false;
  deleteType: 'governorate' | 'city' | null = null;
  itemToDelete: any = null;

  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.governorateForm = this.fb.group({
      id: [null],
      nameAr: ['', [Validators.required, Validators.minLength(3)]],
      nameEn: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.cityForm = this.fb.group({
      id: [null],
      governorateId: [null, Validators.required],
      nameAr: ['', [Validators.required, Validators.minLength(3)]],
      nameEn: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setLoading(isLoading: boolean, message: string = ''): void {
    this.isLoading = isLoading;
    this.loadingMessage = message;
    this.cdr.detectChanges();
  }

  loadGovernorates(): void {
    this.setLoading(true, 'جاري تحميل المحافظات...');
    this.locationService.getAllLocationsGovernorate().subscribe(
      (response: ApiResponse<LocationGovernorate[]>) => {
        this.governorates = response.data;
        this.setLoading(false);
      },
      (error) => {
        console.error('خطأ في تحميل المحافظات:', error);
        this.setLoading(false);
      }
    );
  }

  loadCities(governorateId: number): void {
    this.setLoading(true, 'جاري تحميل المدن...');
    this.selectedGovernorateId = governorateId;
    this.locationService.getAllLocationsCites(governorateId).subscribe(
      (response: ApiResponse<LocationCity[]>) => {
        this.cities = response.data;
        this.setLoading(false);
      },
      (error) => {
        console.error('خطأ في تحميل المدن:', error);
        this.setLoading(false);
      }
    );
  }

  showAddGovernorate(): void {
    this.isEditing = false;
    this.governorateForm.reset();
    this.showGovernorateModal = true;
  }

  showEditGovernorate(governorate: LocationGovernorate): void {
    this.isEditing = true;
    this.governorateForm.patchValue(governorate);
    setTimeout(() => {
      this.showGovernorateModal = true;
    }, 0);
  }

  showAddCity(): void {
    if (!this.selectedGovernorateId) return;
    this.isEditing = false;
    this.cityForm.reset({ governorateId: this.selectedGovernorateId });
    setTimeout(() => {
      this.showCityModal = true;
    }, 0);
  }

  showEditCity(city: LocationCity): void {
    this.isEditing = true;
    this.cityForm.patchValue(city);
    setTimeout(() => {
      this.showCityModal = true;
    }, 0);
  }

  closeGovernorateModal(): void {
    this.showGovernorateModal = false;
    this.governorateForm.reset();
    this.isEditing = false;
  }

  closeCityModal(): void {
    this.showCityModal = false;
    this.cityForm.reset();
    this.isEditing = false;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
     this.itemToDelete = null;
  }

  showDeleteConfirmation(type: 'governorate' | 'city', item: any): void {
    this.deleteType = type;
    this.itemToDelete = item;
    setTimeout(() => {
      this.showDeleteModal = true;
    }, 0);
  }

  onSubmitGovernorate(): void {
    if (this.governorateForm.invalid) return;

    const governorate = this.governorateForm.value;
    this.setLoading(true, 'جاري حفظ المحافظة...');

    const request = this.isEditing
      ? this.locationService.UpdateLocationsGovernorate(governorate)
      : this.locationService.AddLocationsGovernorate(governorate);

    request.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    ).subscribe((response: ApiResponse<LocationGovernorate>) => {
      this.closeGovernorateModal();
      this.loadGovernorates();
    }, (error) => {
      console.error('خطأ في حفظ المحافظة:', error);
    });
  }

  onSubmitCity(): void {
    if (this.cityForm.invalid) return;

    const city = this.cityForm.value;
    this.setLoading(true, 'جاري حفظ المدينة...');

    const request = this.isEditing
      ? this.locationService.UpdateLocationsCity(city)
      : this.locationService.AddLocationsCity(city);

    request.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    ).subscribe((response: ApiResponse<LocationCity>) => {
      this.closeCityModal();
      if (this.selectedGovernorateId) {
        this.loadCities(this.selectedGovernorateId);
      }
    }, (error) => {
      console.error('خطأ في حفظ المدينة:', error);
    });
  }

  confirmDelete(): void {
    if (!this.deleteType || !this.itemToDelete) return;

    this.setLoading(true, 'جاري الحذف...');
    const request = this.deleteType === 'governorate'
      ? this.locationService.DeleteLocationsGovernorate(this.itemToDelete.id)
      : this.locationService.DeleteLocationsCity(this.itemToDelete.id);

    request.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    ).subscribe((response: ApiResponse<void>) => {
      console.log(this.deleteType == 'governorate');

      this.closeDeleteModal();
      if (this.deleteType == 'governorate') {
        this.loadGovernorates();
        this.deleteType = null;
      } else if (this.selectedGovernorateId) {
        this.loadCities(this.selectedGovernorateId);
      }
    }, (error) => {
      console.error('خطأ في الحذف:', error);
    });
  }

  backToGovernorates(): void {
    this.selectedGovernorateId = null;
    this.cities = [];
  }
}
