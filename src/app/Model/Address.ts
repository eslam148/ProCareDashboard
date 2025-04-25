export interface City {
    id: number;
    nameAr: string;
    nameEn: string;
    governorateId: number;
    governorate: string;
  }
  export interface Governorate {
    id: number;
    nameAr: string;
    nameEn: string;
  }
  
  export interface Specialty {
    id: number;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
  }