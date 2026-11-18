/** Currency codes that Intl can format, such as "EUR" or "JPY". */
const currencies = new Set(Intl.supportedValuesOf("currency"));

/** Returns a locale Intl can use, or throws a clear error naming an invalid or unknown one. */
const checkLocale = (locale) => {
  let canonical;
  try {
    canonical = Intl.getCanonicalLocales(locale)[0];
  } catch {
    throw new RangeError(`Invalid locale: ${JSON.stringify(locale)}`);
  }
  if (Intl.NumberFormat.supportedLocalesOf([canonical]).length === 0) {
    throw new RangeError(`Unsupported locale: ${JSON.stringify(locale)}`);
  }
  return canonical;
};

/** Returns an uppercase ISO 4217 code, or throws a clear error naming an unknown currency. */
const checkCurrency = (currency) => {
  const code = String(currency).toUpperCase();
  if (!currencies.has(code)) {
    throw new RangeError(`Unknown currency code: ${JSON.stringify(currency)}`);
  }
  return code;
};

/**
 * Formats an amount in cents as a decimal string, such as 123456789 as "1,234,567.89".
 * With a currency and locale, shows the total as that customer reads it, such as
 * formatTotal(123456, { currency: "EUR", locale: "de-DE" }) as "1.234,56 €".
 */
export const formatTotal = (cents, options = {}) => {
  const { currency, locale } = options ?? {};
  if (currency === undefined && locale === undefined) {
    const sign = cents < 0 ? "-" : "";
    const absolute = Math.abs(cents);
    const whole = String(Math.floor(absolute / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${sign}${whole}.${String(absolute % 100).padStart(2, "0")}`;
  }

  const code = currency === undefined ? undefined : checkCurrency(currency);
  const tag = locale === undefined ? undefined : checkLocale(locale);
  if (code === undefined) {
    const formatter = new Intl.NumberFormat(tag, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(cents / 100);
  }

  const formatter = new Intl.NumberFormat(tag, { style: "currency", currency: code });
  const digits = formatter.resolvedOptions().maximumFractionDigits;
  return formatter.format(cents / 10 ** digits);
};
