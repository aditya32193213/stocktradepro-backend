/**
 * -----------------------------------------------------
 * Companies Master Data
 * -----------------------------------------------------
 * This file contains static metadata for real-world companies.
 *
 * IMPORTANT:
 * - No market data is stored here
 * - No prices, volumes, or market caps
 * - Used as input for generateStockData()
 *
 * Icon field corresponds to Simple Icons slug.
 * Missing icons are handled gracefully in frontend.
 */


export const companies = [
  // =========================
  // TECHNOLOGY (1–20)
  // =========================
  { symbol: "AAPL", companyName: "Apple Inc.", sector: "Technology", icon: "apple" },
  { symbol: "MSFT", companyName: "Microsoft Corporation", sector: "Technology", icon: "microsoft" },
  { symbol: "GOOGL", companyName: "Alphabet Inc.", sector: "Technology", icon: "google" },
  { symbol: "META", companyName: "Meta Platforms Inc.", sector: "Technology", icon: "meta" },
  { symbol: "NVDA", companyName: "NVIDIA Corporation", sector: "Technology", icon: "nvidia" },
  { symbol: "ORCL", companyName: "Oracle Corporation", sector: "Technology", icon: "oracle" },
  { symbol: "IBM", companyName: "IBM Corporation", sector: "Technology", icon: "ibm" },
  { symbol: "INTC", companyName: "Intel Corporation", sector: "Technology", icon: "intel" },
  { symbol: "ADBE", companyName: "Adobe Inc.", sector: "Technology", icon: "adobe" },
  { symbol: "SAP", companyName: "SAP SE", sector: "Technology", icon: "sap" },
  { symbol: "CRM", companyName: "Salesforce Inc.", sector: "Technology", icon: "salesforce" },
  { symbol: "CSCO", companyName: "Cisco Systems Inc.", sector: "Technology", icon: "cisco" },
  { symbol: "AMD", companyName: "Advanced Micro Devices", sector: "Technology", icon: "amd" },
  { symbol: "QCOM", companyName: "Qualcomm Inc.", sector: "Technology", icon: "qualcomm" },
  { symbol: "HPQ", companyName: "HP Inc.", sector: "Technology", icon: "hp" },
  { symbol: "DELL", companyName: "Dell Technologies", sector: "Technology", icon: "dell" },
  { symbol: "ASML", companyName: "ASML Holding", sector: "Technology", icon: "asml" },
  { symbol: "TSM", companyName: "Taiwan Semiconductor", sector: "Technology", icon: "tsmc" },
  { symbol: "SONY", companyName: "Sony Group Corporation", sector: "Technology", icon: "sony" },
  { symbol: "PANW", companyName: "Palo Alto Networks", sector: "Technology", icon: "paloaltonetworks" },

  // =========================
  // E-COMMERCE & INTERNET (21–35)
  // =========================
  { symbol: "AMZN", companyName: "Amazon.com Inc.", sector: "E-Commerce", icon: "amazon" },
  { symbol: "SHOP", companyName: "Shopify Inc.", sector: "E-Commerce", icon: "shopify" },
  { symbol: "EBAY", companyName: "eBay Inc.", sector: "E-Commerce", icon: "ebay" },
  { symbol: "BABA", companyName: "Alibaba Group", sector: "E-Commerce", icon: "alibaba" },
  { symbol: "JD", companyName: "JD.com Inc.", sector: "E-Commerce", icon: "jdcom" },
  { symbol: "ETSY", companyName: "Etsy Inc.", sector: "E-Commerce", icon: "etsy" },
  { symbol: "W", companyName: "Wayfair Inc.", sector: "E-Commerce", icon: "wayfair" },
  { symbol: "ZM", companyName: "Zoom Video Communications", sector: "Internet", icon: "zoom" },
  { symbol: "DOCU", companyName: "DocuSign Inc.", sector: "Internet", icon: "docusign" },
  { symbol: "TWLO", companyName: "Twilio Inc.", sector: "Internet", icon: "twilio" },
  { symbol: "OKTA", companyName: "Okta Inc.", sector: "Internet", icon: "okta" },
  { symbol: "SNOW", companyName: "Snowflake Inc.", sector: "Internet", icon: "snowflake" },
  { symbol: "ATLS", companyName: "Atlassian Corporation", sector: "Internet", icon: "atlassian" },
  { symbol: "GIT", companyName: "GitHub Inc.", sector: "Internet", icon: "github" },
  { symbol: "FIVN", companyName: "Five9 Inc.", sector: "Internet", icon: "five9" },

  // =========================
  // FINTECH & PAYMENTS (36–50)
  // =========================
  { symbol: "V", companyName: "Visa Inc.", sector: "Fintech", icon: "visa" },
  { symbol: "MA", companyName: "Mastercard Inc.", sector: "Fintech", icon: "mastercard" },
  { symbol: "PYPL", companyName: "PayPal Holdings", sector: "Fintech", icon: "paypal" },
  { symbol: "SQ", companyName: "Block Inc.", sector: "Fintech", icon: "block" },
  { symbol: "COIN", companyName: "Coinbase Global", sector: "Fintech", icon: "coinbase" },
  { symbol: "ADYEN", companyName: "Adyen NV", sector: "Fintech", icon: "adyen" },
  { symbol: "FIS", companyName: "Fidelity National Info", sector: "Fintech", icon: "fis" },
  { symbol: "INTU", companyName: "Intuit Inc.", sector: "Fintech", icon: "intuit" },
  { symbol: "AFRM", companyName: "Affirm Holdings", sector: "Fintech", icon: "affirm" },
  { symbol: "SOFI", companyName: "SoFi Technologies", sector: "Fintech", icon: "sofi" },
  { symbol: "WISE", companyName: "Wise Plc", sector: "Fintech", icon: "wise" },
  { symbol: "PAY", companyName: "Payoneer", sector: "Fintech", icon: "payoneer" },
  { symbol: "STNE", companyName: "StoneCo", sector: "Fintech", icon: "stone" },
  { symbol: "NU", companyName: "Nubank", sector: "Fintech", icon: "nubank" },
  { symbol: "UPST", companyName: "Upstart Holdings", sector: "Fintech", icon: "upstart" },

  // =========================
  // BANKING (51–60)
  // =========================
  { symbol: "JPM", companyName: "JPMorgan Chase", sector: "Banking", icon: "jpmorgan" },
  { symbol: "BAC", companyName: "Bank of America", sector: "Banking", icon: "bankofamerica" },
  { symbol: "WFC", companyName: "Wells Fargo", sector: "Banking", icon: "wellsfargo" },
  { symbol: "GS", companyName: "Goldman Sachs", sector: "Banking", icon: "goldmansachs" },
  { symbol: "MS", companyName: "Morgan Stanley", sector: "Banking", icon: "morganstanley" },
  { symbol: "C", companyName: "Citigroup Inc.", sector: "Banking", icon: "citigroup" },
  { symbol: "HSBC", companyName: "HSBC Holdings", sector: "Banking", icon: "hsbc" },
  { symbol: "DB", companyName: "Deutsche Bank", sector: "Banking", icon: "deutschebank" },
  { symbol: "UBS", companyName: "UBS Group AG", sector: "Banking", icon: "ubs" },
  { symbol: "BARC", companyName: "Barclays PLC", sector: "Banking", icon: "barclays" },

  // =========================
  // ENTERTAINMENT & MEDIA (61–70)
  // =========================
  { symbol: "NFLX", companyName: "Netflix Inc.", sector: "Entertainment", icon: "netflix" },
  { symbol: "DIS", companyName: "Walt Disney Co.", sector: "Entertainment", icon: "disney" },
  { symbol: "SPOT", companyName: "Spotify Technology", sector: "Entertainment", icon: "spotify" },
  { symbol: "WBD", companyName: "Warner Bros Discovery", sector: "Entertainment", icon: "warnerbros" },
  { symbol: "ROKU", companyName: "Roku Inc.", sector: "Entertainment", icon: "roku" },
  { symbol: "TTWO", companyName: "Take-Two Interactive", sector: "Entertainment", icon: "take-twointeractive" },
  { symbol: "EA", companyName: "Electronic Arts", sector: "Entertainment", icon: "ea" },
  { symbol: "U", companyName: "Unity Software", sector: "Entertainment", icon: "unity" },
  { symbol: "SONO", companyName: "Sonos Inc.", sector: "Entertainment", icon: "sonos" },
  { symbol: "BILI", companyName: "Bilibili Inc.", sector: "Entertainment", icon: "bilibili" },

  // =========================
  // AUTOMOTIVE & ENERGY (71–85)
  // =========================
  { symbol: "TSLA", companyName: "Tesla Inc.", sector: "Automotive", icon: "tesla" },
  { symbol: "F", companyName: "Ford Motor Company", sector: "Automotive", icon: "ford" },
  { symbol: "GM", companyName: "General Motors", sector: "Automotive", icon: "generalmotors" },
  { symbol: "BMW", companyName: "BMW Group", sector: "Automotive", icon: "bmw" },
  { symbol: "MBG", companyName: "Mercedes-Benz Group", sector: "Automotive", icon: "mercedesbenz" },
  { symbol: "RIVN", companyName: "Rivian Automotive", sector: "Automotive", icon: "rivian" },
  { symbol: "XOM", companyName: "Exxon Mobil", sector: "Energy", icon: "exxonmobil" },
  { symbol: "CVX", companyName: "Chevron Corporation", sector: "Energy", icon: "chevron" },
  { symbol: "BP", companyName: "BP plc", sector: "Energy", icon: "bp" },
  { symbol: "SHEL", companyName: "Shell plc", sector: "Energy", icon: "shell" },
  { symbol: "TOT", companyName: "TotalEnergies", sector: "Energy", icon: "totalenergies" },
  { symbol: "NEE", companyName: "NextEra Energy", sector: "Energy", icon: "nexteraenergy" },
  { symbol: "PLUG", companyName: "Plug Power", sector: "Energy", icon: "plug" },
  { symbol: "ENPH", companyName: "Enphase Energy", sector: "Energy", icon: "enphase" },
  { symbol: "SEDG", companyName: "SolarEdge", sector: "Energy", icon: "solaredge" },

  // =========================
  // RETAIL & HOSPITALITY (86–100)
  // =========================
  { symbol: "WMT", companyName: "Walmart Inc.", sector: "Retail", icon: "walmart" },
  { symbol: "COST", companyName: "Costco Wholesale", sector: "Retail", icon: "costco" },
  { symbol: "TGT", companyName: "Target Corporation", sector: "Retail", icon: "target" },
  { symbol: "HD", companyName: "Home Depot", sector: "Retail", icon: "homedepot" },
  { symbol: "LOW", companyName: "Lowe's Companies", sector: "Retail", icon: "lowes" },
  { symbol: "NKE", companyName: "Nike Inc.", sector: "Retail", icon: "nike" },
  { symbol: "MCD", companyName: "McDonald's Corporation", sector: "Retail", icon: "mcdonalds" },
  { symbol: "SBUX", companyName: "Starbucks Corporation", sector: "Retail", icon: "starbucks" },
  { symbol: "ABNB", companyName: "Airbnb Inc.", sector: "Hospitality", icon: "airbnb" },
  { symbol: "BKNG", companyName: "Booking Holdings", sector: "Hospitality", icon: "bookingdotcom" },
];
