import { ImageSourcePropType } from "react-native";

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

export interface User {
  id: string;
  name: string;
  email: string;
}

export type Product = {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    image: ImageSourcePropType;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    sold: number;
    discountLabel?: string;
    delivery: string;
    colors: string[];
    sellerId: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export interface Seller {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  reviews: number;
  sales: number;
  location: string;
  verified: boolean;
  description?: string;
}