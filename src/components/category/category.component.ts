import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  ModalBodyComponent

} from '@coreui/angular';

 import { AddSubCategoryRequest, Category, SubCategoryRequest } from '../../app/Model/Category';
  
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalFooterComponent, ModalBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, FormsModule, CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, TableDirective, AvatarComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: { data: Category[] } = { data: [] };
  isAddCategoryModalVisible: boolean = false;
  isAddSubcategoryModalVisible: boolean = false;
  newCategory: { name: string } = { name: '' };
  isLoading: boolean = false;
  newSubcategory: { name: string; parentCategoryId: number | null } = { name: '', parentCategoryId: null };
  public AddModalVisible = false;
  public AddSubModalVisible = false;
  public DeleteModalVisible = false;
  public DeleteSubModalVisible = false;
  public EditModalVisible = false;
  public ShowSubCategoryModalVisible = false;
  public SubCategoryDeleteModalVisible = false;
  public EditSubCategoryModalVisible = false;
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;
  selectedCategory: Category | null = null;
  selectedSubCategory: SubCategoryRequest | null = null;
  SubCategory:  { data: SubCategoryRequest[] } = { data: [] };

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.categoryForm = this.fb.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
      descriptionAr: ['', Validators.required],
      descriptionEn: ['', Validators.required],
    });
     this.subCategoryForm = this.fb.group({
      ServiceCategoryId: [Boolean, Validators.required],
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
      descriptionAr: ['', Validators.required],
      descriptionEn: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
       /// console.log('Categories fetched successfully:', this.categories);
      //  console.log('Internal Message:', this.categories.data[0].nameAr);
        
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  showAddCategoryModal(): void {
    this.AddModalVisible = true;
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  closeAddCategoryModal(): void {
    this.AddModalVisible = false;
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  showDeleteCategoryModal(category: Category): void {
    this.selectedCategory = category;
    this.DeleteModalVisible = true;
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  closeDeleteCategoryModal(): void {
    this.DeleteModalVisible = false;
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  showEditCategoryModal(category: Category): void {
    this.selectedCategory = category;
    console.log('Category name:',this.EditModalVisible);

    console.log('Selected category for edit:', this.selectedCategory);
    this.EditModalVisible = !this.EditModalVisible;
 
    this.categoryForm.patchValue({
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      descriptionAr: category.descriptionAr,
      descriptionEn: category.descriptionEn
    });
    console.log('Category name:',this.EditModalVisible);

    this.cdr.detectChanges(); // Notify Angular of the change
   }

  closeEditCategoryModal(): void {
    console.log('Category comfirm:',this.EditModalVisible);
    this.EditModalVisible = false;
    this.selectedCategory = null;
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  addCategory() {
    // Logic to add category
    console.log('Category added:', this.newCategory);
    this.closeAddCategoryModal();
  }

  addSubcategory() {
    // Logic to add subcategory
    console.log('Subcategory added:', this.newSubcategory);
    // this.closeAddSubcategoryModal();
  }

  toggleModal(modalType: 'add' | 'delete', category?: Category) {
    if (modalType === 'add') {
      this.AddModalVisible = true;
      this.DeleteModalVisible = false;
    } else if (modalType === 'delete') {
      this.AddModalVisible = false;
      this.DeleteModalVisible = true;
      this.selectedCategory = category || null;
    }
  }

  closeModal(modalType: 'add' | 'delete') {
    if (modalType === 'add') {
      this.AddModalVisible = false;
    } else if (modalType === 'delete') {
      this.DeleteModalVisible = false;
    }
  }

  toggleLiveDemo() {
    console.log('Live demo toggled:', this.AddModalVisible);
    this.AddModalVisible = !this.AddModalVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.AddModalVisible = event;
  }

  handleAddModalChange(event: boolean): void {
    this.AddModalVisible = event;
  }

  handleDeleteModalChange(event: boolean): void {
    this.DeleteModalVisible = event;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }

    const formData = new FormData();
    formData.append('NameAr', this.categoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.categoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.categoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.categoryForm.get('descriptionEn')?.value);
    formData.append('Icon', this.selectedFile);

    this.categoryService.addCategory(formData).subscribe(
      (response) => {
        console.log('Category added successfully:', response);
        this.categories.data.push(response.data); // Add the new category to the list
        this.categoryForm.reset();
        this.selectedFile = null;
        this.isAddCategoryModalVisible = false; // Close the modal
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

 
  toggleComfirm(category: Category) {
    console.log('DeleteModalVisible toggled:', this.DeleteModalVisible);
    this.selectedCategory = category; // Set the selected category
    this.DeleteModalVisible = !this.DeleteModalVisible; // Ensure only this modal is visible
  }
  closeComfirm() {
    
    this.DeleteModalVisible = !this.DeleteModalVisible; // Ensure only this modal is visible
  }

  handletoggleComfirmChange(event: boolean) {
    this.DeleteModalVisible = event;
  }

  confirmDelete() {
    if (this.selectedCategory) {
      console.log('Deleting category:', this.selectedCategory.id);
      this.categoryService.deleteCategory(this.selectedCategory.id).subscribe(
        () => {
          console.log('Category deleted successfully');
          this.categories.data = this.categories.data.filter(
            (cat) => cat.id !== this.selectedCategory?.id
          ); // Remove the deleted category from the list
          this.DeleteModalVisible = false; // Close the modal
          this.selectedCategory = null; // Reset the selected category
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  onSubmitEdit(): void {
    if (this.categoryForm.invalid) {
      this.fileError = !this.selectedFile;
      return;
    }

    const formData = new FormData();
    if (this.selectedCategory?.id) {
      formData.append('Id', this.selectedCategory.id.toString());
    }
    formData.append('NameAr', this.categoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.categoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.categoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.categoryForm.get('descriptionEn')?.value);
    if (this.selectedFile) {
      formData.append('Icon', this.selectedFile);
    }

    this.categoryService.updateCategory(formData).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        const index = this.categories.data.findIndex(
          (cat) => cat.id === this.selectedCategory?.id
        );
        if (index !== -1) {
          this.categories.data[index] = response.data; // Update the category in the list
        }
        this.categoryForm.reset();
        this.selectedFile = null;
        this.EditModalVisible = false; // Close the modal
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }

  ShowAddSubCategory(selectedCategory:Category): void {
    console.log('Selected category:', selectedCategory); // Log the selected category
    this.AddSubModalVisible = true;
    this.selectedCategory = selectedCategory; // Set the selected category
    this.cdr.detectChanges(); // Notify Angular of the change
  }

  closeAddSubCategoryModal(): void {

    this.AddSubModalVisible = false;
    this.cdr.detectChanges(); // Notify Angular of the change
  }
  handleAddSubCategoryModalChange(event: boolean): void {
    this.AddSubModalVisible = event;
  }
////////////////////////////////////////////////////////////////////////
  
  ShowsubCategory(id:number): void {
    console.log('Subcategory ID:', id); // Log the ID of the selected category
    this.ShowSubCategoryModalVisible = true;
    this.categoryService.getAllSubCategories(id).subscribe(
      (data) => {
        if (data.data.length === 0) {
          console.log('No subcategories found for this category.');
          this.SubCategory = { data: [] }; // Set to empty array if no subcategories found
          return;
        }
        this.SubCategory = data;
        console.log('Subcategories fetched successfully:', data);
        this.selectedCategory = this.categories.data.find(cat => cat.id === id) || null; // Find the selected category from the list

        console.log('Selected category form show:', this.selectedCategory); // Log the selected category
        
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
     
  }

  closeSubCategoryModal(): void {

    this.ShowSubCategoryModalVisible = false;
    this.cdr.detectChanges(); // Notify Angular of the change
  }
  
  handleSubCategoryModalChange(event: boolean): void {
    this.ShowSubCategoryModalVisible = event;
  }

  ///////////////////////////////////////
  toggleSubCategoryComfirm(subcategory: SubCategoryRequest) {
    console.log('DeleteModalVisible toggled:', this.SubCategoryDeleteModalVisible);
    this.selectedSubCategory = subcategory; // Set the selected category
    this.SubCategoryDeleteModalVisible = !this.SubCategoryDeleteModalVisible; // Ensure only this modal is visible
  }
  closeSubCategoryComfirm() {
    
    this.SubCategoryDeleteModalVisible = !this.SubCategoryDeleteModalVisible; // Ensure only this modal is visible
  }
  confirmSubCategoryDelete(){
    if (this.selectedSubCategory) {
      console.log('Deleting category:', this.selectedSubCategory?.id);
      this.categoryService.deleteSubCategory(this.selectedSubCategory.id).subscribe(
        () => {
          console.log('Category deleted successfully');
          this.SubCategory.data = this.SubCategory.data.filter(
            (subcat) => subcat.id !== this.selectedSubCategory?.id
          ); // Remove the deleted category from the list
          this.SubCategoryDeleteModalVisible = false; // Close the modal
          this.selectedSubCategory = null; // Reset the selected category
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  onAddSubCategorySubmit(){
    if (this.subCategoryForm.invalid) {
      return;
    }
    if (this.subCategoryForm.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }    const formData = new FormData();
   
    formData.append('NameAr', this.subCategoryForm.get('nameAr')?.value);
    formData.append('NameEn', this.subCategoryForm.get('nameEn')?.value);
    formData.append('DescriptionAr', this.subCategoryForm.get('descriptionAr')?.value);
    formData.append('DescriptionEn', this.subCategoryForm.get('descriptionEn')?.value);
    formData.append('ServiceCategoryId', this.selectedCategory?.id.toString() || '');
    formData.append('Icon', this.selectedFile);

    this.categoryService.addSubCategory(formData).subscribe(
      (response) => {
        console.log('Subcategory added successfully:', response);
        this.SubCategory.data.push(response.data); // Add the new subcategory to the list
        this.subCategoryForm.reset();
        this.AddSubModalVisible = false; // Close the modal
      },
      (error) => {
        console.error('Error adding subcategory:', error);
      }
    );
  }
  showEditSubCategoryModal(subcategory: SubCategoryRequest): void {
     this.selectedSubCategory = subcategory;
    console.log('Selected subcategory for edit:', this.selectedSubCategory);
    this.EditSubCategoryModalVisible = !this.EditSubCategoryModalVisible;
    this.subCategoryForm.patchValue({
      nameAr: subcategory.nameAr,
      nameEn: subcategory.nameEn,
      descriptionAr: subcategory.descriptionAr,
      descriptionEn: subcategory.descriptionEn
    });
    console.log('Selected subcategory for edit:', this.selectedCategory);
    console.log('Subcategory name:',this.EditSubCategoryModalVisible);

    this.cdr.detectChanges(); // Notify Angular of the change
   }
   
   closeEditSubCategoryModal(): void {
    console.log('SubCategory comfirm:',this.EditSubCategoryModalVisible);
    this.EditSubCategoryModalVisible = false;
    this.selectedSubCategory = null;
    this.cdr.detectChanges(); // Notify Angular of the change
    }


    onEditSubCategorySubmit(){
      if (this.subCategoryForm.invalid) {
        return;
      }
      if (this.subCategoryForm.invalid || !this.selectedFile) {
        this.fileError = !this.selectedFile;
        return;
      }    const formData = new FormData();
     const subcategoryId = this.selectedSubCategory?.id;
     const  categoryId = this.selectedCategory?.id;
      console.log('Selected  category ID:',this.selectedCategory); // Log the selected subcategory ID
      formData.append('NameAr', this.subCategoryForm.get('nameAr')?.value);
      formData.append('NameEn', this.subCategoryForm.get('nameEn')?.value);
      formData.append('DescriptionAr', this.subCategoryForm.get('descriptionAr')?.value);
      formData.append('DescriptionEn', this.subCategoryForm.get('descriptionEn')?.value);
      formData.append('ServiceCategoryId',  `${categoryId}` );
      formData.append('Id',  `${subcategoryId}` );

      formData.append('Icon', this.selectedFile);
  console.log('Selected subcategory ID:',subcategoryId); // Log the selected subcategory ID
      this.categoryService.updateSubCategory(formData).subscribe(
        (response) => {
          console.log('Subcategory added successfully:', response);
          this.SubCategory.data.push(response.data); // Add the new subcategory to the list
          this.subCategoryForm.reset();
          this.EditSubCategoryModalVisible = false; // Close the modal
        },
        (error) => {
          console.error('Error adding subcategory:', error);
        }
      );
    }
}
