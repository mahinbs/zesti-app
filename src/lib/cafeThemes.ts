export interface CafeTheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    card: string;
}

export const DEFAULT_THEME: CafeTheme = {
    primary: "#0F172A", // Slate 900
    secondary: "#64748B", // Slate 500
    accent: "#3B82F6", // Blue 500
    background: "#F8FAFC", // Slate 50
    text: "#0F172A",
    card: "#FFFFFF",
};

export const CAFE_THEMES: Record<string, CafeTheme> = {
    "c1": { // The Grind - Coffee colors
        primary: "#78350F", // Amber 900
        secondary: "#92400E", // Amber 700
        accent: "#D97706", // Amber 600
        background: "#FFFBEB", // Amber 50
        text: "#451A03",
        card: "#FFFFFF",
    },
    "c2": { // Burger & Brew - Red/Orange
        primary: "#991B1B", // Red 800
        secondary: "#B91C1C", // Red 700
        accent: "#F59E0B", // Amber 500
        background: "#FEF2F2", // Red 50
        text: "#7F1D1D",
        card: "#FFFFFF",
    },
    "c3": { // Sushi Zen - Green/Teal
        primary: "#115E59", // Teal 800
        secondary: "#0F766E", // Teal 700
        accent: "#14B8A6", // Teal 500
        background: "#F0FDFA", // Teal 50
        text: "#134E4A",
        card: "#FFFFFF",
    },
};

export function getCafeTheme(cafeId: string): CafeTheme {
    return CAFE_THEMES[cafeId] || DEFAULT_THEME;
}
