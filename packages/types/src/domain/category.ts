export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  iconUrl: string;
  description?: string;
  descriptionAr?: string;
  streamCount: number;
  isApproved: boolean;
  sortOrder: number;
}
