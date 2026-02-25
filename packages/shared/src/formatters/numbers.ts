const arFormatter = new Intl.NumberFormat("ar-EG");
const enFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(num: number, locale: "ar" | "en" = "ar"): string {
  return locale === "ar" ? arFormatter.format(num) : enFormatter.format(num);
}

export function formatViewerCount(
  count: number,
  locale: "ar" | "en" = "ar",
): string {
  if (count >= 1_000_000) {
    const val = (count / 1_000_000).toFixed(1);
    return locale === "ar" ? `${val} م` : `${val}M`;
  }
  if (count >= 1_000) {
    const val = (count / 1_000).toFixed(1);
    return locale === "ar" ? `${val} ألف` : `${val}K`;
  }
  return formatNumber(count, locale);
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}

export function formatCoinBalance(
  balance: number,
  locale: "ar" | "en" = "ar",
): string {
  return `${formatNumber(balance, locale)} 🪙`;
}
