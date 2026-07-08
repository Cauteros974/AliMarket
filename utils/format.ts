export function formatPrice(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
    }).format(value);
}

export function pluralizeReviews(count: number) {
  return `${count.toLocaleString("en-US")} reviews`;
}