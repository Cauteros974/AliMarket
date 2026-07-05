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
}