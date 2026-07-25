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
