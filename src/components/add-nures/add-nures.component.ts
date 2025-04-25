import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule,ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
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
import { NurseService } from '../../Services/nurse.service';
import { AddressService } from '../../Services/address.service';
import { City, Governorate, Specialty } from '../../app/Model/Address';
import { Nurse } from '../../app/Model/Nurse';
@Component({
  selector: 'app-add-nures',
  imports: [AvatarComponent,ReactiveFormsModule, FormsModule, ModalFooterComponent, ModalBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, FormsModule, CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, TableDirective,], 
  templateUrl: './add-nures.component.html',
  styleUrl: './add-nures.component.scss'
})
export class AddNuresComponent {
  nurseForm: FormGroup;
  AddModalVisible: boolean = false;
  fileError: boolean = false;
  DeleteModalVisible: boolean = false;
  selectedNures: any = null; // To store the selected category for deletion
  // بيانات المدن
  cities?:City[] 
  // بيانات المحافظات
  governorates?:Governorate[]  

  // بيانات التخصصات
  specialties?:Specialty[] ;  
  Nurse?: Nurse[] ;  


     constructor(private fb: FormBuilder,private nuresServices: NurseService,private addressService: AddressService) {
      this.nurseForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', [
          Validators.required,
          Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/) // مثال: رقم مصري يبدأ بـ 010 أو 011 أو 012 أو 015
        ]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        cityId: [0, Validators.required],
        governorateId: [0, Validators.required],
        specialtyId: [0, Validators.required],
        // latitude: ['', [
        //   Validators.required,
        //   Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/)
        // ]],
        // longitude: ['', [
        //   Validators.required,
        //   Validators.pattern(/^[-+]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?$/)
        // ]],
        medicalLicense: ['', Validators.required],
        profilePicture: [null, Validators.required]
      }, {
        validators: this.passwordMatchValidator
      });

      this.addressService.getCities().subscribe((response) => {
        this.cities = response.data
      })
      
      this.addressService.getGovernorates().subscribe((response) => {
        this.governorates = response.data
      })
      this.addressService.getSpecialties().subscribe((response) => {
        this.specialties = response.data
      })
      this.nuresServices.getNurses(1,20,"").subscribe((response) => {
        this.Nurse = response.data.items
      })
    }
  
    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.nurseForm.patchValue({
        profilePicture: event.target.files[0]
      });
    }
  }

  onSubmit() {
    if (this.nurseForm.invalid) return;
  
    const formData = new FormData();
    const formValue = this.nurseForm.value;
  
    // Log the form value to see the structure
    console.log('Form Value:', formValue);
    console.log('Form Value:', formValue.firstName);
    console.log('Form Value:', formValue.lastName);
    console.log('Form Value:', formValue.phoneNumber);
    console.log('Form Value:', formValue.password);
    console.log('Form Value:', formValue.confirmPassword);
  
    formData.append('UserData.FirstName', formValue.firstName);
    formData.append('UserData.LastName', formValue.lastName);
    formData.append('UserData.PhoneNumber', formValue.phoneNumber);
    formData.append('UserData.Password', formValue.password);
    formData.append('UserData.ConfirmPassword', formValue.confirmPassword);
    formData.append('CityId', formValue.cityId.toString());
    formData.append('GovernorateId', formValue.governorateId.toString());
    formData.append('SpecialtyId', formValue.specialtyId.toString());
    formData.append('Latitude',"27.19758537025095");
    formData.append('Longitude', "31.169599403197235"), 
    formData.append('MedicalLicense', formValue.medicalLicense);
    formData.append('ProfilePicture', formValue.profilePicture);

    // Optional: Show what's inside FormData
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    // Check and append the profile picture
    if (formValue.profilePicture) {
      formData.append('ProfilePicture', formValue.profilePicture, formValue.profilePicture.name);
    }
  
    // Log the FormData object to check if the data is appended correctly
   
    this.nuresServices.addNurse(formData).subscribe(
      (response) => {
        console.log('Nurse added successfully:', response);
        this.nurseForm.reset();
        //this.Nurse.append(formValue); // Append the new nurse to the list 
        this.AddModalVisible = false; // Close the modal after successful submission
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
    
   
  }
  
  ShowAddNurse(): void {
    console.log('ShowAddNurse called');
    this.AddModalVisible =  !this.AddModalVisible;
  }
  closeComfirm(){
    this.DeleteModalVisible = false; 
  }
  confirmDelete(){
    this.nuresServices.deleteNurse(this.selectedNures.id).subscribe(
      (response) => {
        console.log('Nurse deleted successfully:', response);
        this.Nurse = this.Nurse?.filter(
          (cat) => cat.id !== this.selectedNures?.id
        ); 
        this.nurseForm.reset();
        this.DeleteModalVisible = false; // Close the modal after successful submission
        // Optionally, refresh the list of nurses or perform any other action
      },
      (error) => {
        console.error('Error deleting nurse:', error);
      }
    );
   
  }
  handleDeleteModalChange(event: boolean): void {
    this.DeleteModalVisible = event;

  }
  toggleComfirm(Nures:Nurse){
    
    this.selectedNures = Nures; // Store the selected category for deletion
    this.DeleteModalVisible = !this.DeleteModalVisible; // Toggle the modal visibility
  }
}
