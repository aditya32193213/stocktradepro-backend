// /**
//  * -----------------------------------------------------
//  * Generate Stock Data
//  * -----------------------------------------------------
//  * This utility function enriches a company object
//  * with realistic, randomly generated market data.
//  *
//  * Used during database seeding only.
//  * No external API calls are made here.
//  *
//  * @param {Object} company - Static company metadata
//  * @returns {Object} Complete stock object ready for DB insert
//  */
function normalizeSlug(value = "") {
  const slug = value
    .toLowerCase()
    .replace(/\b(inc|ltd|llc|corp|corporation|company|co|group|holdings|plc)\b/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();

  return slug.length >= 3 ? slug : null;
}

export const generateStockData = (company) => {
  const price = +(Math.random() * (3500 - 50) + 50).toFixed(2);

  const sharesOutstanding =
    Math.floor(Math.random() * 1_000_000_000) + 100_000_000;

  
  const iconSlug =
    normalizeSlug(company.icon) ||
    normalizeSlug(company.companyName);

  return {
    symbol: company.symbol,
    companyName: company.companyName,
    sector: company.sector,
    description: company.description,

    /**
     * External SVG logo (Simple Icons CDN)
     * - Google, Amazon, Apple → work again
     * - Unknown brands → null
     */
    logoUrl: iconSlug
      ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconSlug}.svg`
      : null,

    price,
    changePercent: +(Math.random() * 4 - 2).toFixed(2),
    volume: Math.floor(Math.random() * 5_000_000) + 100_000,
    peRatio: +(Math.random() * (40 - 10) + 10).toFixed(2),

    marketCap: Math.min(
      Math.floor(price * sharesOutstanding),
      5_000_000_000_000
    ),
  };
};
