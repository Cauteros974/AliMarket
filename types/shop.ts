export type CategoryId =
  | "electronics"
  | "fashion"
  | "home"
  | "beauty"
  | "sports"
  | "toys";

export type Category = {
  id: CategoryId;
  title: string;
  icon: string;
  subcategories: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
};