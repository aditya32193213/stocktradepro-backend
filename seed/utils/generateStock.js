/**
 * -----------------------------------------------------
 * Generate Stock Data
 * -----------------------------------------------------
 * This utility function enriches a company object
 * with realistic, randomly generated market data.
 *
 * Used during database seeding only.
 * No external API calls are made here.
 *
 * @param {Object} company - Static company metadata
 * @returns {Object} Complete stock object ready for DB insert
 */

export const generateStockData = (company) => {
  // Generate a realistic stock price between 50 and 3500
  const price = +(Math.random() * (3500 - 50) + 50).toFixed(2);

  // Simulate realistic shares outstanding
  const sharesOutstanding =
    Math.floor(Math.random() * 1_000_000_000) + 100_000_000;

  return {
    // Basic company identifiers
    symbol: company.symbol,
    companyName: company.companyName,
    sector: company.sector,

    /**
     * Primary logo source:
     * jsDelivr CDN + Simple Icons
     * Fallback is handled in frontend if icon is missing
     */
    logoUrl: `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${company.icon}.svg`,

    // Market data
    price,
    changePercent: +(Math.random() * 4 - 2).toFixed(2), //-2% to +2%
    volume: Math.floor(Math.random() * 5_000_000) + 100_000,
    peRatio: +(Math.random() * (40 - 10) + 10).toFixed(2),

    /**
     * Market Cap = price × sharesOutstanding
     * Clamped to prevent unrealistic values
     */
    marketCap: Math.min(
      Math.floor(price * sharesOutstanding),
      5_000_000_000_000
    ),
  };
};
