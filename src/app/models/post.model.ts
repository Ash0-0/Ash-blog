export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}