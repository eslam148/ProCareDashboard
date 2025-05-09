export interface Category {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  iconUrl: string;
}

export interface AddSubCategoryRequest {
  fromCallCenter: boolean;
  serviceCategoryId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: File;
}

export interface  SubCategoryRequest {
  id: number;
  fromCallCenter: boolean;
  serviceCategoryId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  iconUrl: string;
}
