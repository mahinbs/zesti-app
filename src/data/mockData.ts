export interface User {
    id: string;
    name: string;
    avatar: string;
    status?: "online" | "eating" | "offline";
    lastActive?: string;
}

export interface Story {
    id: string;
    user: User;
    image: string;
    cafeName?: string;
    timestamp: string;
}

export interface Activity {
    id: string;
    user: User;
    type: "ordered" | "visited" | "liked" | "review";
    cafe: Cafe;
    foodItem?: FoodItem;
    timestamp: string;
    likes: number;
    comments: number;
    image?: string; // photo of the food/cafe
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
    coverImage?: string;
    followers: number;
    followed: boolean;
    tagline?: string;
    isOpen?: boolean;
    offer?: string;
    followerImages?: string[];
    loyaltyProgram?: {
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

export const MOCK_USERS: User[] = [
    { id: "u2", name: "Sarah", avatar: "https://i.pravatar.cc/150?u=u2", status: "eating" },
    { id: "u3", name: "Mike", avatar: "https://i.pravatar.cc/150?u=u3", status: "online" },
    { id: "u4", name: "Jessica", avatar: "https://i.pravatar.cc/150?u=u4", status: "offline" },
    { id: "u5", name: "David", avatar: "https://i.pravatar.cc/150?u=u5", status: "eating" },
];

export const MOCK_CAFES: Cafe[] = [
    {
        id: "c1",
        name: "Mumbai Chaat House",
        address: "Street Flavor, Real Mumbai Taste", // Using address as tagline placement in design? No, address is usually location. The design has "Street Flavor..." as tagline.
        distance: "0.3 km",
        rating: 4.8,
        followers: 1250,
        followed: true, // UI shows "Follow" button
        tagline: "Street Flavor, Real Mumbai Taste",
        isOpen: false,
        offer: "10% off chaats",
        followerImages: [MOCK_USERS[0].avatar, MOCK_USERS[1].avatar, MOCK_USERS[2].avatar],
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "visits",
            target: 5,
            current: 3,
            reward: "Free Chaat",
        },
        menu: [
            {
                id: "f1",
                name: "Pani Puri",
                price: 180,
                image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2600&auto=format&fit=crop",
                rating: 4.9,
                reviews: 120,
                tags: ["Spicy", "Street Food"],
                socialProof: {
                    type: "friends",
                    message: "Sarah & 2 others ordered this",
                    users: [MOCK_USERS[0], MOCK_USERS[1]]
                }
            }
        ]
    },
    {
        id: "c2",
        name: "Tandoori Junction",
        address: "Smoky Grills, Bold Spices",
        distance: "0.4 km",
        rating: 4.6,
        followers: 1020,
        followed: false,
        tagline: "Smoky Grills, Bold Spices",
        isOpen: false,
        offer: "Free naan",
        followerImages: [MOCK_USERS[1].avatar, MOCK_USERS[2].avatar, MOCK_USERS[3].avatar],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "points",
            target: 500,
            current: 250,
            reward: "Free Tandoori Chicken",
        },
        menu: [
            {
                id: "f3",
                name: "Butter Chicken",
                price: 350,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2600&auto=format&fit=crop",
                rating: 4.7,
                reviews: 210,
                tags: ["Curry", "Lunch"],
                socialProof: {
                    type: "popular",
                    message: "Most ordered today",
                }
            }
        ]
    },
    {
        id: "c3",
        name: "Dosa Delight",
        address: "Crispy, Golden, Perfect",
        distance: "0.5 km",
        rating: 4.9,
        followers: 900,
        followed: true,
        tagline: "Crispy, Golden, Perfect.",
        isOpen: false,
        offer: "₹20 off dosas",
        followerImages: [MOCK_USERS[2].avatar, MOCK_USERS[3].avatar, MOCK_USERS[0].avatar],
        image: "https://images.unsplash.com/photo-1589301760576-416cd6a8e57e?q=80&w=2600&auto=format&fit=crop",
        loyaltyProgram: {
            type: "visits",
            target: 10,
            current: 1,
            reward: "Free Masala Dosa",
        },
        menu: []
    },
    {
        id: "c4",
        name: "Punjabi Dhaba",
        address: "Desi Comfort, Unlimited Flavour",
        distance: "0.6 km",
        rating: 4.7,
        followers: 1530,
        followed: false,
        tagline: "Desi Comfort, Unlimited Flavour",
        isOpen: false,
        offer: "10% off everything",
        followerImages: [MOCK_USERS[3].avatar, MOCK_USERS[0].avatar, MOCK_USERS[1].avatar],
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600&auto=format&fit=crop",
        menu: []
    },
    {
        id: "c5",
        name: "Delhi Biryani Corner",
        address: "Layers of Royal Taste",
        distance: "0.7 km",
        rating: 4.8,
        followers: 1580,
        followed: true,
        tagline: "Layers of Royal Taste",
        isOpen: false,
        offer: "₹30 off biryanis",
        followerImages: [MOCK_USERS[0].avatar, MOCK_USERS[1].avatar, MOCK_USERS[2].avatar],
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2600&auto=format&fit=crop",
        menu: []
    }
];

export const MOCK_STORIES: Story[] = [
    { id: "s1", user: MOCK_USERS[0], image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80", cafeName: "The Grind", timestamp: "10m ago" },
    { id: "s2", user: MOCK_USERS[3], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80", cafeName: "Burger & Brew", timestamp: "35m ago" },
];

export const FRIENDS_ACTIVITIES: Activity[] = [
    {
        id: "a1",
        user: MOCK_USERS[0],
        type: "ordered",
        cafe: MOCK_CAFES[0],
        foodItem: MOCK_CAFES[0].menu[0],
        timestamp: "5 min ago",
        likes: 12,
        comments: 2,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2600&auto=format&fit=crop"
    },
    {
        id: "a2",
        user: MOCK_USERS[1],
        type: "visited",
        cafe: MOCK_CAFES[1],
        timestamp: "2 hours ago",
        likes: 45,
        comments: 5,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2600&auto=format&fit=crop"
    },
    {
        id: "a3",
        user: MOCK_USERS[3],
        type: "review",
        cafe: MOCK_CAFES[2],
        timestamp: "Yesterday",
        likes: 8,
        comments: 0,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2600&auto=format&fit=crop"
    }
];

export const TRENDING_ITEMS = [
    { ...MOCK_CAFES[0].menu[0], cafeName: MOCK_CAFES[0].name, cafeId: MOCK_CAFES[0].id },
    { ...MOCK_CAFES[0].menu[1], cafeName: MOCK_CAFES[0].name, cafeId: MOCK_CAFES[0].id },
    { ...MOCK_CAFES[1].menu[0], cafeName: MOCK_CAFES[1].name, cafeId: MOCK_CAFES[1].id },
];
