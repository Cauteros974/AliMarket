/* Prepares products for the comparison table. 
 * Supports different catalog field names.*/

export type ComparisonProduct = {
    id: string;
    title: string;
    price: number | null;
    currency: string;
    category: string;
    brand: string;
    description: string;
    attributes: Record<string, string>;
};

type RawProduct = Record<string, unknown>;

function asRecord(value: unknown): RawProduct {
    if(value && typeof value === "object" && !Array.isArray(value)) {
        return value as RawProduct;
    }

    return {};
}

function readText(value: unknown): string {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    return"";
}

function readPrice(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if(typeof value === "string") {
        // Supports numbers and prices like "€59.99".
        const normalized = value.replace(/\s/g, "").replace(",", ".");
        const match = normalized.match(/-?\d+(?:\.\d+)?/);

        if (match) {
            const parsed = Number(match[0]);
            return Number.isFinite(parsed) ? parsed : null;
        }
    }

    return null;
}

function readAttributes(value: unknown): Record<string, string> {
    const record = asRecord(value);

    return Object.fromEntries(
        Object.entries(record)
            .filter(([, item]) =>
                ["string", "number", "boolean"].includes(typeof item)
            )
            .map(([key, item]) => [key, String(item)])
    );
}

export function toComparisonProduct(
    value: unknown
) : ComparisonProduct {
    const product = asRecord(value);
    
    const rawAttributes =
        product.attributes ??
        product.specifications ??
        product.specs;

    const currency = readText(product.currency) || "€";

    return{
        id: readText(product.id),
        title: 
            readText(product.title) ||
            readText(product.name) ||
            readText(product.title) ||
            "Product without a name",

        price: readPrice(product.price ?? product.salePrice),
        currency,

        category: 
            readText(product.categoryName) ||
            readText(product.category) ||
            "Not specified",

        brand: readText(product.brand) || "Not specified",

        description: readText(product.brand) || "Description missing",

        attributes: readAttributes(rawAttributes)
    };
}

export function getComparisonRows(products: ComparisonProduct[]) {
    const keys = new Set<string> ([
        "Price",
        "Category",
        "Brand"
    ]);

    products.forEach((product) => {
        Object.keys(product.attributes).forEach((key) => keys.add(key));
    });

    return Array.from(keys).map((key) => {
        const values = products.map((product) => {
            if(key === "Price") {
                return product.price === null
                    ? "Not specified"
                    : `${product.currency}${product.price.toFixed(2)}`;
            }

            if(key === "Category") return product.category;
            if(key === "Brand") return product.brand;
        })
    })
}