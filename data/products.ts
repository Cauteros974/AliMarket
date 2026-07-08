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
        image:
        "./assets/images/headphone.avif",
        price: 49.99,
        oldPrice: 79.99,
        rating: 4.8,
        reviews: 1824,
        sold: 5300,
        discountLabel: "-38%",
        delivery: "Free delivery in 9-14 days",
        colors: ["#111827", "#F3F4F6", "#E85D3F"],
    },
    {
        id: "p2",
        title: "Smart LED Ambient Light Strip",
        description: "RGB smart light strip for bedroom, desk or gaming setup. Includes app control, scenes and music sync.",
        categoryId: "home",
        image: 
        ".assets/images/man.avif",
        price: 18.49,
        oldPrice: 29.99,
        rating: 4.6,
        reviews: 941,
        sold: 8100,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#8B5CF6", "#06B6D4", "#F97316"],
    }
]