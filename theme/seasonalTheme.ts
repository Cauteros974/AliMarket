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
    sucess: string;
    danger: string;
};

export const SEASONAL_THEMES: Record<Season, SeasonColors> = {
    spring: {
        background: "#F3F8F1",
        surface: "#FFFFFF",
        surfaceElevated: "#E7F2E3",
        primary: "#39845A",
        primaryPressed: "#286A45",
        onPrimary: "#FFFFFF",
        accent: "#A6CFA1",
        text: "#203629",
    }
}