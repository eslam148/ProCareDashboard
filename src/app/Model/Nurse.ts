export interface NurseRegistration {
    userData: UserData;
    cityId: number;
    governorateId: number;
    specialtyId: number;
    latitude: string;
    longitude: string;
    medicalLicense: string;
    profilePicture: File | null; 
  }
  export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }


  export interface Nurse {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    rate: number | null; // Can be null or a number
    specialization: string;
    specializationId: number;
    imageUrl: string;
    governorate: string;
    governorateId: number;
    city: string;
    cityId: number;
    latitude: string;
    longitude: string;
    licenseNumber: string;
  }
  
  export interface ApiResponse {
    status: number;
    message: string;
    internalMessage: string | null;
    data: {
      items: Nurse[];
    };
  }
  