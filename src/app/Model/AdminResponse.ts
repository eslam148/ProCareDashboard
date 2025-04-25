import { AdminItem } from "./AdminItem";

export interface AdminResponse {
  data: AdminItem;
  totalCount: number;
  pageSize: number;
  currentPage: number;
}
