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
};

export type Product = {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    image: string;
    price: number;
    oldPrice?: number;
}