import { Category, Product, Seller, ProductQuestion } from "../types/product";

export const categories: Category[] = [
    {
        id: "electronics",
        title: "Electronics",
        icon: "phone-portrait-outline",
        subcategories: ["Phones", "Laptops", "Audio"],
    },
    {
        id: "fashion",
        title: "Fashion",
        icon: "shirt-outline",
        subcategories: ["Men", "Women", "Kids"],
    },
    {
        id: "home",
        title: "Home",
        icon: "home-outline",
        subcategories: ["Furniture", "Lighting", "Decor"],
    },
    {
        id: "beauty",
        title: "Beauty",
        icon: "sparkles-outline",
        subcategories: ["Skincare", "Makeup", "Haircare"],
    },
    {
        id: "sports",
        title: "Sports",
        icon: "barbell-outline",
        subcategories: ["Fitness", "Outdoor", "Team sports"],
    },
    {
        id: "toys",
        title: "Toys",
        icon: "game-controller-outline",
        subcategories: ["Educational", "Action figures", "Puzzles"],
    },
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
        title: "Round Fitness Smartwatch",
        description: "Round-face smartwatch with heart rate and calorie tracking, interchangeable silicone bands and a bright touchscreen display.",
        categoryId: "electronics",
        sellerId: "seller-1",
        image: require("../assets/images/smartwatch.webp"),
        price: 99.99,
        oldPrice: 120.99,
        rating: 4.8,
        reviews: 1024,
        sold: 5300,
        discountLabel: "-38%",
        delivery: "Free delivery in 9-14 days",
        colors: ["#111827", "#F3F4F6", "#E85D3F"],
    },

    {
        id: "p3",
        title: "Square Sport Smartwatch",
        description: "Lightweight square smartwatch with step counter, heart rate monitor and sleep tracking in a soft silicone band.",
        categoryId: "electronics",
        sellerId: "seller-1",
        image: require("../assets/images/smartwatch2.webp"),
        price: 99.99,
        oldPrice: 120.99,
        rating: 4.8,
        reviews: 1024,
        sold: 5300,
        discountLabel: "-38%",
        delivery: "Free delivery in 9-14 days",
        colors: ["#111827", "#F3F4F6", "#E85D3F"],
    },
    
    {
        id: "p4",
        title: "Rugged Outdoor Smartwatch",
        description: "Durable smartwatch with call function, weather display and step tracking, built for active outdoor use in any condition.",
        categoryId: "electronics",
        sellerId: "seller-1",
        image: require("../assets/images/smartwatch3.webp"),
        price: 99.99,
        oldPrice: 120.99,
        rating: 4.8,
        reviews: 1024,
        sold: 5300,
        discountLabel: "-38%",
        delivery: "Free delivery in 9-14 days",
        colors: ["#111827", "#F3F4F6", "#E85D3F"],
    },

    {
        id: "p5",
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
        id: "p6",
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
        id: "p7",
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
    },

    // --------------------------------------------------
    // FASHION
    // --------------------------------------------------

    {
        id: "p8",
        title: "Oversized Cotton Hoodie",
        description: "Heavyweight oversized hoodie with dropped shoulders, kangaroo pocket and soft brushed fleece lining for everyday comfort.",
        categoryId: "fashion",
        sellerId: "seller-3",
        image: require("../assets/images/sweater.avif"),
        price: 20.0,
        oldPrice: 39.99,
        rating: 4.7,
        reviews: 901,
        sold: 800,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#0be7c9", "#089449", "#F97316"],
    },

    {
        id: "p9",
        title: "Classic Pullover Hoodie",
        description: "Relaxed-fit pullover hoodie in soft cotton blend fabric with ribbed cuffs and adjustable drawstring hood.",
        categoryId: "fashion",
        sellerId: "seller-1",
        image: require("../assets/images/sweater2.webp"),
        price: 25.0,
        oldPrice: 42.99,
        rating: 4.8,
        reviews: 425,
        sold: 200,
        discountLabel: "42%",
        delivery: "Free delivery in 7-12 days",
        colors: ["#060507", "#089449", "#1a0560"],
    },

    // --------------------------------------------------
    // HOME
    // --------------------------------------------------

    {
        id: "p10",
        title: "Ceramic Bud Vase Set",
        description: "Set of small matte ceramic bud vases in varied shapes, perfect for styling single stems or mixed floral displays.",
        categoryId: "home",
        sellerId: "seller-4",
        image: require("../assets/images/vases.jpg"),
        price: 70.0,
        oldPrice: 100.0,
        rating: 4.7,
        reviews: 901,
        sold: 230,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#fafafa", "#399564", "#e36104"],
    },

    {
        id: "p11",
        title: "Geometric Ceramic Vase Collection",
        description: "Sculptural ceramic vase collection with ring, wave and abstract shapes, handcrafted matte finish for modern shelf styling.",
        categoryId: "home",
        sellerId: "seller-2",
        image: require("../assets/images/vases2.jpg"),
        price: 39.99,
        oldPrice: 50.0,
        rating: 4.7,
        reviews: 901,
        sold: 100,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#ffffff", "#fefffe", "#f9f9f9"],
    },

    // --------------------------------------------------
    // BEAUTY
    // --------------------------------------------------

    {
        id: "p12",
        title: "Brightening Vitamin C Serum",
        description: "Lightweight facial serum with vitamin C and orange extract to brighten skin tone and even out complexion.",
        categoryId: "beauty",
        sellerId: "seller-3",
        image: require("../assets/images/vitamin-с.jpeg"),
        price: 20.0,
        oldPrice: 39.99,
        rating: 4.7,
        reviews: 901,
        sold: 800,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#eaee69"],
    },

    {
        id: "p13",
        title: "Green Tangerine Dark Spot Serum",
        description: "Vitamin C serum with green tangerine extract that targets dark spots and uneven skin tone for a radiant glow.",
        categoryId: "beauty",
        sellerId: "seller-1",
        image: require("../assets/images/vitamin-c2.jpg"),
        price: 20.0,
        oldPrice: 39.99,
        rating: 4.7,
        reviews: 901,
        sold: 800,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#0be7c9", "#089449", "#F97316"],
    },

    // --------------------------------------------------
    // FASHION
    // --------------------------------------------------

    {
        id: "p12",
        title: "Minimal Streetwear Crossbody Bag",
        description: "Compact water-resistant crossbody bag with adjustable strap, phone pocket and hidden zipper compartment.",
        categoryId: "fashion",
        sellerId: "seller-4",
        image: require("../assets/images/womans_bag.avif"),
        price: 20.0,
        oldPrice: 39.99,
        rating: 4.7,
        reviews: 901,
        sold: 800,
        discountLabel: "Hot",
        delivery: "Free delivery in 7-12 days",
        colors: ["#0be7c9", "#089449", "#F97316"],
    },
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
        description: "Official electronics marketplace seller specializing in headphones, smartphones and accessories.",
    },

    {
        id: "seller-2",
        name: "HomeStyle Store",
        rating: 4.8,
        reviews: 8640,
        sales: 31800,
        location: "Poland",
        verified: true,
        description: "Home accessories, smart lighting and products for comfortable living.",
    },

    {
        id: "seller-3",
        name: "Urban Fashion",
        rating: 4.7,
        reviews: 6240,
        sales: 24100,
        location: "France",
        verified: true,
        description: "Modern streetwear, bags and everyday fashion accessories.",
    },

    {
        id: "seller-4",
        name: "Beauty Lab",
        rating: 4.9,
        reviews: 10320,
        sales: 39600,
        location: "Italy",
        verified: true,
        description: "Skincare and beauty products for everyday routines.",
    },
];

const questions: ProductQuestion[] = [
    {
        id: "q1",
        author: "Nina",
        question: "Does it arrive with tracking?",
        answer: "Yes, all demo orders include a local tracking timeline.",
    },
    {
        id: "q2",
        author: "Lucas",
        question: "Can I return it if it does not fit?",
        answer: "In a real app this would depend on the seller policy. Here it is demo-only.",
    },
]