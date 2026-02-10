export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface FoodItem {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    tags: string[];
    socialProof?: {
        type: "popular" | "friends" | "trending";
        message: string;
        users?: User[];
    };
}

export interface Cafe {
    id: string;
    name: string;
    address: string;
    distance: string; // e.g. "1.2 km"
    rating: number;
    image: string;
    loyaltyProgram: {
        type: "visits" | "points";
        target: number;
        current?: number; // for user context
        reward: string;
    };
    menu: FoodItem[];
}

export const CURRENT_USER: User = {
    id: "u1",
    name: "Sahil",
    avatar: "https://i.pravatar.cc/150?u=u1",
};

export const MOCK_CAFES: Cafe[] = [
    {
        id: "c1",
        name: "The Grind Coffee Co.",
        address: "123 Main St, Downtown",
        distance: "0.8 km",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "visits",
            target: 5,
            current: 3,
            reward: "Free Coffee",
        },
        menu: [
            {
                id: "f1",
                name: "Caramel Macchiato",
                price: 180,
                image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2600&auto=format&fit=crop",
                rating: 4.9,
                reviews: 120,
                tags: ["Coffee", "Sweet"],
                socialProof: {
                    type: "friends",
                    message: "Sarah & 2 others ordered this",
                    users: [
                        { id: 'u2', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=u2' },
                        { id: 'u3', name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=u3' }
                    ]
                }
            },
            {
                id: "f2",
                name: "Avocado Toast",
                price: 250,
                image: "https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2600&q=80",
                rating: 4.5,
                reviews: 85,
                tags: ["Breakfast", "Healthy"],
                socialProof: {
                    type: "trending",
                    message: "Trending in your area",
                }
            }
        ]
    },
    {
        id: "c2",
        name: "Burger & Brew",
        address: "456 Market Rd",
        distance: "1.5 km",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "points",
            target: 500,
            current: 250,
            reward: "Free Burger",
        },
        menu: [
            {
                id: "f3",
                name: "Classic Cheeseburger",
                price: 350,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2600&auto=format&fit=crop",
                rating: 4.7,
                reviews: 210,
                tags: ["Burger", "Lunch"],
                socialProof: {
                    type: "popular",
                    message: "Most ordered today",
                }
            }
        ]
    },
    {
        id: "c3",
        name: "Sushi Zen",
        address: "789 Park Ave",
        distance: "2.2 km",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "visits",
            target: 10,
            current: 1,
            reward: "Free Sushi Roll",
        },
        menu: []
    }
];

export const TRENDING_ITEMS = [
    { ...MOCK_CAFES[0].menu[0], cafeName: MOCK_CAFES[0].name, cafeId: MOCK_CAFES[0].id },
    { ...MOCK_CAFES[0].menu[1], cafeName: MOCK_CAFES[0].name, cafeId: MOCK_CAFES[0].id },
    { ...MOCK_CAFES[1].menu[0], cafeName: MOCK_CAFES[1].name, cafeId: MOCK_CAFES[1].id },
];
