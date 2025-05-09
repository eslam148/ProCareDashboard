import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  CardBodyComponent,
  CardComponent,
  TableDirective,
  TextColorDirective,
  AvatarComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalFooterComponent,
  ModalBodyComponent,
  SpinnerComponent,
  ButtonDirective,
  FormModule,
  GridModule,
  ButtonModule,
  TableModule,
  CardHeaderComponent
} from '@coreui/angular';
import { AddSubCategoryRequest, Category, SubCategoryRequest } from '../../app/Model/Category';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { GeneralResponse } from '../../app/Model/GeneralResponse';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalFooterComponent,
    ModalBodyComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    AvatarComponent,
    SpinnerComponent,
    ButtonDirective,
    FormModule,
    GridModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  private destroy$ = new Subject<void>();
  
  categories: { data: Category[] } = { data: [] };
  SubCategory: { data: SubCategoryRequest[] } = { data: [] };
  
  isLoading = false;
  loadingMessage = '';
  
  // Modal states
  AddModalVisible = false;
  AddSubModalVisible = false;
  DeleteModalVisible = false;
  DeleteSubModalVisible = false;
  EditModalVisible = false;
  ShowSubCategoryModalVisible = false;
  EditSubCategoryModalVisible = false;
  
  // Forms
  categoryForm!: FormGroup;
  subCategoryForm!: FormGroup;
  
  // Selected items
  selectedCategory: Category | null = null;
  selectedSubCategory: SubCategoryRequest | null = null;
  selectedFile: File | null = null;
  fileError = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.initForms();
  }

  private initForms(): void {
    this.categoryForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(3)]],
      nameEn: ['', [Validators.required, Validators.minLength(3)]],
      descriptionAr: ['', [Validators.required, Validators.minLength(10)]],
      descriptionEn: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.subCategoryForm = this.fb.group({
      ServiceCategoryId: [null, Validators.required],
      nameAr: ['', [Validators.required, Validators.minLength(3)]],
      nameEn: ['', [Validators.required, Validators.minLength(3)]],
      descriptionAr: ['', [Validators.required, Validators.minLength(10)]],
      descriptionEn: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
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

  loadCategories(): void {
    this.setLoading(true, 'جاري تحميل الفئات...');
    this.categoryService.getAllCategories()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error: any) => {
          console.error('خطأ في تحميل الفئات:', error);
        }
      });
  }

  showAddCategoryModal(): void {
    this.categoryForm.reset();
    this.selectedFile = null;
    this.fileError = false;
    setTimeout(() => {
      this.AddModalVisible = true;
    }, 0);
  }

  closeAddCategoryModal(): void {
    this.AddModalVisible = false;
    this.categoryForm.reset();
    this.selectedFile = null;
    this.fileError = false;
  }

  showEditCategoryModal(category: Category): void {
    this.selectedCategory = category;
    this.categoryForm.patchValue({
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      descriptionAr: category.descriptionAr,
      descriptionEn: category.descriptionEn
    });
    setTimeout(() => {
      this.EditModalVisible = true;
    }, 0);
  }

  closeEditCategoryModal(): void {
    this.EditModalVisible = false;
    this.selectedCategory = null;
    this.categoryForm.reset();
  }

  showDeleteCategoryModal(category: Category): void {
    this.selectedCategory = category;
    setTimeout(() => {
      this.DeleteModalVisible = true;
    }, 0);
  }

  closeDeleteCategoryModal(): void {
    this.DeleteModalVisible = false;
    this.selectedCategory = null;
  }

  showDeleteSubCategoryModal(subcategory: SubCategoryRequest): void {
    this.selectedSubCategory = subcategory;
    setTimeout(() => {
      this.DeleteSubModalVisible = true;
    }, 0);
  }

  closeDeleteSubCategoryModal(): void {
    this.DeleteSubModalVisible = false;
    this.selectedSubCategory = null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.fileError = false;
      } else {
        this.fileError = true;
        this.selectedFile = null;
      }
    } else {
      this.fileError = true;
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }

    this.setLoading(true, 'جاري إضافة الفئة...');
    const formData = new FormData();
    formData.append('NameAr', this.categoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.categoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.categoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.categoryForm.get('descriptionEn')?.value);
    formData.append('Icon', this.selectedFile);

    this.categoryService.addCategory(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (response) => {
          this.categories.data.push(response.data);
          this.closeAddCategoryModal();
        },
        error: (error: any) => {
          console.error('خطأ في إضافة الفئة:', error);
        }
      });
  }

  onSubmitEdit(): void {
    if (this.categoryForm.invalid || !this.selectedCategory) return;

    this.setLoading(true, 'جاري تحديث الفئة...');
    const formData = new FormData();
    formData.append('NameAr', this.categoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.categoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.categoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.categoryForm.get('descriptionEn')?.value);
    if (this.selectedFile) {
      formData.append('Icon', this.selectedFile);
    }

    this.categoryService.updateCategory(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (response) => {
          const index = this.categories.data.findIndex(cat => cat.id === this.selectedCategory?.id);
          if (index !== -1) {
            this.categories.data[index] = response.data;
          }
          this.closeEditCategoryModal();
        },
        error: (error: any) => {
          console.error('خطأ في تحديث الفئة:', error);
        }
      });
  }

  confirmDelete(): void {
    if (!this.selectedCategory) return;

    this.setLoading(true, 'جاري حذف الفئة...');
    this.categoryService.deleteCategory(this.selectedCategory.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: () => {
          this.categories.data = this.categories.data.filter(
            cat => cat.id !== this.selectedCategory?.id
          );
          this.closeDeleteCategoryModal();
        },
        error: (error: any) => {
          console.error('خطأ في حذف الفئة:', error);
        }
      });
  }

  // SubCategory methods
  ShowAddSubCategory(category: Category): void {
    this.selectedCategory = category;
    this.subCategoryForm.patchValue({
      ServiceCategoryId: category.id
    });
    setTimeout(() => {
      this.AddSubModalVisible = true;
    }, 0);
  }

  closeAddSubCategoryModal(): void {
    this.AddSubModalVisible = false;
    this.subCategoryForm.reset();
    this.selectedFile = null;
    this.fileError = false;
  }

  ShowsubCategory(id: number): void {
    this.setLoading(true, 'جاري تحميل الفئات الفرعية...');
    this.categoryService.getAllSubCategories(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (data: GeneralResponse<SubCategoryRequest[]>) => {
          this.SubCategory = data;
          setTimeout(() => {
            this.ShowSubCategoryModalVisible = true;
          }, 0);
        },
        error: (error: any) => {
          console.error('خطأ في تحميل الفئات الفرعية:', error);
        }
      });
  }

  closeSubCategoryModal(): void {
    this.ShowSubCategoryModalVisible = false;
    this.SubCategory = { data: [] };
  }

  onAddSubCategorySubmit(): void {
    if (this.subCategoryForm.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }

    this.setLoading(true, 'جاري إضافة الفئة الفرعية...');
    const formData = new FormData();
    formData.append('ServiceCategoryId', this.subCategoryForm.get('ServiceCategoryId')?.value);
    formData.append('NameAr', this.subCategoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.subCategoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.subCategoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.subCategoryForm.get('descriptionEn')?.value);
    formData.append('Icon', this.selectedFile);

    this.categoryService.addSubCategory(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (response) => {
          this.SubCategory.data.push(response.data);
          this.closeAddSubCategoryModal();
        },
        error: (error: any) => {
          console.error('خطأ في إضافة الفئة الفرعية:', error);
        }
      });
  }

  showEditSubCategoryModal(subcategory: SubCategoryRequest): void {
    this.selectedSubCategory = subcategory;
    this.subCategoryForm.patchValue({
      ServiceCategoryId: subcategory.serviceCategoryId,
      nameAr: subcategory.nameAr,
      nameEn: subcategory.nameEn,
      descriptionAr: subcategory.descriptionAr,
      descriptionEn: subcategory.descriptionEn
    });
    setTimeout(() => {
      this.EditSubCategoryModalVisible = true;
    }, 0);
  }

  closeEditSubCategoryModal(): void {
    this.EditSubCategoryModalVisible = false;
    this.selectedSubCategory = null;
    this.subCategoryForm.reset();
  }

  onEditSubCategorySubmit(): void {
    if (this.subCategoryForm.invalid || !this.selectedSubCategory) return;

    this.setLoading(true, 'جاري تحديث الفئة الفرعية...');
    const formData = new FormData();
    formData.append('ServiceCategoryId', this.subCategoryForm.get('ServiceCategoryId')?.value);
    formData.append('NameAr', this.subCategoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.subCategoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.subCategoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.subCategoryForm.get('descriptionEn')?.value);
    if (this.selectedFile) {
      formData.append('Icon', this.selectedFile);
    }

    this.categoryService.updateSubCategory(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (response) => {
          const index = this.SubCategory.data.findIndex(sub => sub.id === this.selectedSubCategory?.id);
          if (index !== -1) {
            this.SubCategory.data[index] = response.data;
          }
          this.closeEditSubCategoryModal();
        },
        error: (error: any) => {
          console.error('خطأ في تحديث الفئة الفرعية:', error);
        }
      });
  }

  confirmSubCategoryDelete(): void {
    if (!this.selectedSubCategory) return;

    this.setLoading(true, 'جاري حذف الفئة الفرعية...');
    this.categoryService.deleteSubCategory(this.selectedSubCategory.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: () => {
          this.SubCategory.data = this.SubCategory.data.filter(
            sub => sub.id !== this.selectedSubCategory?.id
          );
          this.DeleteSubModalVisible = false;
          this.selectedSubCategory = null;
        },
        error: (error: any) => {
          console.error('خطأ في حذف الفئة الفرعية:', error);
        }
      });
  }
}
