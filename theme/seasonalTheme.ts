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

    autumn: {
        background: "#FFF8EF",
        surface: "#FFFFFF",
        surfaceElevated: "#FBEBD7",
        primary: "#B86A24",
        primaryPressed: "#96521B",
        onPrimary: "#FFFFFF",
    }
}