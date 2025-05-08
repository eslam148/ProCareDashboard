
export interface LocationGovernorate {
  id: number;
  nameAr: string;
  nameEn: string;
   
}
export interface LocationCity {
  id: number;
  nameAr: string;
  nameEn: string;
  governorateId: number;
  governorate: string;
 // governorateNameEn: string;
}
 