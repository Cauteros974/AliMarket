export type Season = "spring" | "summer" | "autumn" | "winter";

export type SeasonMode = "auto" | Season;

export type SeasonColors = {
    background: string;
    surface: string;
    surfaceElevated: string;
    primary: string;
    primaryPressed: string;
    onPrimary: string;
    accent: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    danger: string;
};

export const SEASONAL_THEMES: Record<Season, SeasonColors> = {
    // Spring — fresh green and minty ingredients.
    spring: {
        background: "#F3F8F1",
        surface: "#FFFFFF",
        surfaceElevated: "#E7F2E3",
        primary: "#39845A",
        primaryPressed: "#286A45",
        onPrimary: "#FFFFFF",
        accent: "#A6CFA1",
        text: "#203629",
        textSecondary: "#687B6D",
        border: "#D8E5D5",
        success: "#23834B",
        danger: "#C44545",
    },

    // Summer — turquoise and sunny shades.
    summer: {
        background: "#F1FAFC",
        surface: "#FFFFFF",
        surfaceElevated: "#DFF4F5",
        primary: "#087F8C",
        primaryPressed: "#066571",
        onPrimary: "#FFFFFF",
        accent: "#F4CB62",
        text: "#17363C",
        textSecondary: "#617D82",
        border: "#D2E9EB",
        success: "#218653",
        danger: "#C44545",
    },

    // Autumn — amber, orange, and cream.
    autumn: {
        background: "#FFF8EF",
        surface: "#FFFFFF",
        surfaceElevated: "#FBEBD7",
        primary: "#B86A24",
        primaryPressed: "#96521B",
        onPrimary: "#FFFFFF",
        accent: "#E9A23B",
        text: "#402B1D",
        textSecondary: "#89715F",
        border: "#EEDCC6",
        success: "#348052",
        danger: "#C44545",
    },
    
    winter: {
        background: "#F3F8FD",
        surface: "#FFFFFF",
        surfaceElevated: "#E2EEFA",
        primary: "#367BB7",
        primaryPressed: "#245F94",
        onPrimary: "#FFFFFF",
        accent: "#A9D8F5",
        text: "#1D3044",
        textSecondary: "#657C94",
        border: "#D5E4F2",
        success: "#23834B",
        danger: "#C44545",
    }
};

export function getCurrentSeason(date: Date = new Date()): Season {
    const month = date.Month();
}