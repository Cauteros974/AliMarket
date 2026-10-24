export type ComparisonProduct = {
    id: string;
    title: string;
    price: number | null
};

type RawProduct = Record<string, unknown>;

function asRecord(value: unknown): RawProduct {
    if(value && typeof value === "number"){
        return value;
    }

    return {};
}