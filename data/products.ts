import { Category, Product } from "../types/product";

export const categories: Category[] = [
    { id: "electronics", title: "Electronics", icon: "phone-portrait-outline" },
    { id: "fashion", title: "Fashion", icon: "shirt-outline" },
    { id: "home", title: "Home", icon: "home-outline" },
    { id: "beauty", title: "Beauty", icon: "sparkles-outline" },
    { id: "sports", title: "Sports", icon: "barbell-outline" },
    { id: "toys", title: "Toys", icon: "game-controller-outline" },
];

export const products: Product[] = [
    {
        id: "p1",
        title: "Wireless Noise Cancelling Headphones",
        description: "Lightweight headphones with soft ear pads, deep bass, active noise cancelling and up to 35 hours of battery life.",
        categoryId: "electronics",
    }
]