export interface Book {
  id: number;
  point: number;
  title: string;
  updatedAt: string;
  writer: string;
  tag?: string[];
  cover_image: string;
  createdAt: string;
  discount?: number;
}
