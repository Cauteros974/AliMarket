export type ComparisonProduct = {
    id: string;
    title: string;
    price: number | null
};

type RawProduct = Record<string, unknown>;

function asRecord(value: unknown): RawProduct {
    if(value && typeof value === "object" && !Array.isArray(value)) {
        return value as RawProduct;
    }

    return {};
}

function readPrice(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if(typeof value === "string") {
        const normalized = value.replace(/\s/g, "").replace(",", ".");
        const match = normalized.match(/-?\d+(?:\.\d+)?/);

        if (match) {
            const parsed = Number(match[0]);
            return Number.isFinite(parsed) ? parsed : null;
        }
    }
}