import { Category, Product, Seller } from "../types/product";

export const categories: Category[] = [
    { id: "electronics", title: "Electronics", icon: "phone-portrait-outline", subcategories: ["Phones", "Laptops", "Audio"] },
    { id: "fashion", title: "Fashion", icon: "shirt-outline", subcategories: ["Men", "Women", "Kids"] },
    { id: "home", title: "Home", icon: "home-outline", subcategories: ["Furniture", "Lighting", "Decor"] },
    { id: "beauty", title: "Beauty", icon: "sparkles-outline", subcategories: ["Skincare", "Makeup", "Haircare"] },
    { id: "sports", title: "Sports", icon: "barbell-outline", subcategories: ["Fitness", "Outdoor", "Team sports"] },
    { id: "toys", title: "Toys", icon: "game-controller-outline", subcategories: ["Educational", "Action figures", "Puzzles"] },
];

export const products: Product[] = [
    {
        id: "p1",
        title: "Wireless Noise Cancelling Headphones",
        description: "Lightweight headphones with soft ear pads, deep bass, active noise cancelling and up to 35 hours of battery life.",
        categoryId: "electronics",
        sellerId: "seller-1",
        image: require("../assets/images/headphone.avif"),
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
        sellerId: "seller-2",
        image: require("../assets/images/man.avif"),
        price: 18.49,
        oldPrice: 29.99,
        rating: 4.6,
        reviews: 941,
        sold: 8100,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#8B5CF6", "#06B6D4", "#F97316"],
    },
    {
        id: "p3",
        title: "Minimal Streetwear Crossbody Bag",
        description: "Compact water-resistant crossbody bag with adjustable strap, phone pocket and hidden zipper compartment.",
        categoryId: "fashion",
        sellerId: "seller-3",
        image: require("../assets/images/womans_bag.avif"),
        price: 24.9,
        oldPrice: 39.9,
        rating: 4.7,
        reviews: 684,
        sold: 2400,
        discountLabel: "-30%",
        delivery: "Delivery in 8-15 days",
        colors: ["#111827", "#9CA3AF", "#C2410C"],
    },
    {
        id: "p4",
        title: "Hydrating Skin Care Set",
        description: "Daily skin care set with cleanser, serum and cream. Gentle texture, travel-friendly bottles and clean routine.",
        categoryId: "beauty",
        sellerId: "seller-4",
        image: require("../assets/images/cream.avif"),
        price: 32.5,
        oldPrice: 45,
        rating: 4.9,
        reviews: 1202,
        sold: 3900,
        discountLabel: "Best",
        delivery: "Free delivery in 10-16 days",
        colors: ["#F9A8D4", "#FDE68A", "#BFDBFE"],
    }
];

export const sellers: Seller[] = [
  {
    id: "seller-1",
    name: "TechWorld Store",
    rating: 4.9,
    reviews: 12840,
    sales: 52300,
    location: "Germany",
    verified: true,
    description:
      "Official electronics marketplace seller specializing in headphones, smartphones and accessories.",
  },

  {
    id: "seller-2",
    name: "HomeStyle Store",
    rating: 4.8,
    reviews: 8640,
    sales: 31800,
    location: "Poland",
    verified: true,
    description:
      "Home accessories, smart lighting and products for comfortable living.",
  },

  {
    id: "seller-3",
    name: "Urban Fashion",
    rating: 4.7,
    reviews: 6240,
    sales: 24100,
    location: "France",
    verified: true,
    description:
      "Modern streetwear, bags and everyday fashion accessories.",
  },

  {
    id: "seller-4",
    name: "Beauty Lab",
    rating: 4.9,
    reviews: 10320,
    sales: 39600,
    location: "Italy",
    verified: true,
    description:
      "Skincare and beauty products for everyday routines.",
  },
];