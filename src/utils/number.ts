/**
 * Supported currency codes
 */
export const CURRENCY = {
  GBP: "GBP",
  USD: "USD",
} as const;

// Type for supported currencies
export type SupportedCurrency = keyof typeof CURRENCY;

/**
 * Gets the symbol for a given currency code
 *
 * @param {string} currencyCode - The ISO 4217 currency code (e.g., 'USD', 'GBP')
 * @returns {string} The currency symbol (e.g., '$', '£') or empty string if invalid
 *
 * @example
 * // Returns '$'
 * getCurrencySymbol('USD')
 *
 * // Returns '£'
 * getCurrencySymbol('GBP')
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  if (!currencyCode) return "";

  try {
    const parts = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).formatToParts(1);

    return parts.find((part) => part.type === "currency")?.value || "";
  } catch (error) {
    console.error(`Invalid currency code: ${currencyCode}`);
    return "";
  }
};

/**
 * Formats a number as a currency string
 *
 * @param {number} amount - The amount to format
 * @param {string} currency - The ISO 4217 currency code
 * @param {Intl.NumberFormatOptions} [options] - Additional formatting options
 * @returns {string} The formatted currency string or empty string if invalid
 *
 * @example
 * // Returns "$100.00"
 * formatAmountWithCurrency(100, 'USD')
 *
 * // Returns "$100"
 * formatAmountWithCurrency(100, 'USD', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
 */
export const formatAmountWithCurrency = (
  amount: number,
  currency: string,
  options?: Intl.NumberFormatOptions
): string => {
  if (!currency) return "";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      ...options,
    }).format(amount);
  } catch (error) {
    console.error(`Error formatting amount: ${error}`);
    return "";
  }
};

/**
 * Calculates the percentage of progress toward a goal
 *
 * @param {number} goal - The target amount to reach
 * @param {number} currentAmount - The current amount raised
 * @returns {number} The percentage of progress (0-100), rounded to 2 decimal places
 *
 * @example
 * // Returns 75
 * calculateProgress(100, 75)
 *
 * // Returns 100 (capped at 100%)
 * calculateProgress(100, 150)
 *
 * // Returns 0 (when goal is invalid)
 * calculateProgress(0, 50)
 */
export const calculateProgress = (
  goal: number,
  currentAmount: number
): number => {
  // Return 0 if goal is invalid
  if (goal <= 0) return 0;

  // Cap at 100% if goal is exceeded
  if (currentAmount >= goal) return 100;

  // Calculate percentage with 2 decimal precision
  const percentage = (currentAmount / goal) * 100;
  return parseFloat(percentage.toFixed(2));
};
