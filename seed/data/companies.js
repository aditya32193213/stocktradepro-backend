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
  {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    sector: "Technology",
    icon: "apple",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. Famous for the iPhone, Mac, and services ecosystem."
  },
  {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    sector: "Technology",
    icon: "microsoft",
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions. Key products include Windows, Office, Azure, and Xbox."
  },
  {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    sector: "Technology",
    icon: "google",
    description: "Alphabet Inc. is a technology conglomerate holding Google. It offers web-based search, advertisements, maps, software applications, mobile OS, and consumer content."
  },
  {
    symbol: "META",
    companyName: "Meta Platforms Inc.",
    sector: "Technology",
    icon: "meta",
    description: "Meta Platforms builds technologies that help people connect, find communities, and grow businesses. Products include Facebook, Instagram, Messenger, and WhatsApp."
  },
  {
    symbol: "NVDA",
    companyName: "NVIDIA Corporation",
    sector: "Technology",
    icon: "nvidia",
    description: "NVIDIA Corporation focuses on personal computer graphics, graphics processing units (GPUs), and artificial intelligence (AI). It is a dominant player in AI hardware."
  },
  {
    symbol: "ORCL",
    companyName: "Oracle Corporation",
    sector: "Technology",
    icon: "oracle",
    description: "Oracle provides database software and technology, cloud engineered systems, and enterprise software products."
  },
  {
    symbol: "IBM",
    companyName: "IBM Corporation",
    sector: "Technology",
    icon: "ibm",
    description: "International Business Machines (IBM) provides integrated solutions and services that leverage data, technology, and industry expertise."
  },
  {
    symbol: "INTC",
    companyName: "Intel Corporation",
    sector: "Technology",
    icon: "intel",
    description: "Intel designs, manufactures, and sells integrated digital technology platforms worldwide, primarily focusing on microprocessors."
  },
  {
    symbol: "ADBE",
    companyName: "Adobe Inc.",
    sector: "Technology",
    icon: "adobe",
    description: "Adobe Inc. is a diversified software company worldwide. It offers a line of products and services used by creative professionals, including Photoshop and Acrobat."
  },
  {
    symbol: "SAP",
    companyName: "SAP SE",
    sector: "Technology",
    icon: "sap",
    description: "SAP SE is a German multinational software corporation that develops enterprise software to manage business operations and customer relations."
  },
  {
    symbol: "CRM",
    companyName: "Salesforce Inc.",
    sector: "Technology",
    icon: "salesforce",
    description: "Salesforce provides customer relationship management (CRM) technology that brings companies and customers together."
  },
  {
    symbol: "CSCO",
    companyName: "Cisco Systems Inc.",
    sector: "Technology",
    icon: "cisco",
    description: "Cisco Systems designs and sells broad lines of technologies across networking, security, collaboration, applications, and the cloud."
  },
  {
    symbol: "AMD",
    companyName: "Advanced Micro Devices",
    sector: "Technology",
    icon: "amd",
    description: "Advanced Micro Devices (AMD) develops computer processors and related technologies for business and consumer markets."
  },
  {
    symbol: "QCOM",
    companyName: "Qualcomm Inc.",
    sector: "Technology",
    icon: "qualcomm",
    description: "Qualcomm creates semiconductors, software, and services related to wireless technology. It owns patents critical to the 5G and 4G mobile communications standards."
  },
  {
    symbol: "HPQ",
    companyName: "HP Inc.",
    sector: "Technology",
    icon: "hp",
    description: "HP Inc. provides personal computing and other access devices, imaging and printing products, and related technologies."
  },
  {
    symbol: "DELL",
    companyName: "Dell Technologies",
    sector: "Technology",
    icon: "dell",
    description: "Dell Technologies designs, develops, manufactures, markets, sells, and supports various comprehensive and integrated solutions, products, and services."
  },
  {
    symbol: "ASML",
    companyName: "ASML Holding",
    sector: "Technology",
    icon: "asml",
    description: "ASML is a Dutch multinational company specializing in development and manufacturing of photolithography systems for the semiconductor industry."
  },
  {
    symbol: "TSM",
    companyName: "Taiwan Semiconductor",
    sector: "Technology",
    icon: "tsmc",
    description: "TSMC is the world's most valuable semiconductor foundry, manufacturing and selling integrated circuits and semiconductor devices."
  },
  {
    symbol: "SONY",
    companyName: "Sony Group Corporation",
    sector: "Technology",
    icon: "sony",
    description: "Sony designs, develops, produces, and sells electronic equipment, instruments, and devices for consumer, professional, and industrial markets."
  },
  {
    symbol: "PANW",
    companyName: "Palo Alto Networks",
    sector: "Technology",
    icon: "paloaltonetworks",
    description: "Palo Alto Networks provides cybersecurity solutions worldwide, offering firewall appliances and software."
  },

  // =========================
  // E-COMMERCE & INTERNET (21–35)
  // =========================
  {
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    sector: "E-Commerce",
    icon: "amazon",
    description: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. It is also the world's largest cloud provider (AWS)."
  },
  {
    symbol: "SHOP",
    companyName: "Shopify Inc.",
    sector: "E-Commerce",
    icon: "shopify",
    description: "Shopify provides a proprietary e-commerce platform for online stores and retail point-of-sale systems."
  },
  {
    symbol: "EBAY",
    companyName: "eBay Inc.",
    sector: "E-Commerce",
    icon: "ebay",
    description: "eBay operates a global marketplace that connects buyers and sellers in more than 190 markets around the world."
  },
  {
    symbol: "BABA",
    companyName: "Alibaba Group",
    sector: "E-Commerce",
    icon: "alibaba",
    description: "Alibaba Group provides technology infrastructure and marketing reach to help merchants, brands, retailers, and other businesses."
  },
  {
    symbol: "JD",
    companyName: "JD.com Inc.",
    sector: "E-Commerce",
    icon: "jdcom",
    description: "JD.com operates as a leading supply chain-based technology and service provider in China."
  },
  {
    symbol: "ETSY",
    companyName: "Etsy Inc.",
    sector: "E-Commerce",
    icon: "etsy",
    description: "Etsy operates two-sided online marketplaces that connect people looking for unique goods with independent sellers around the world."
  },
  {
    symbol: "W",
    companyName: "Wayfair Inc.",
    sector: "E-Commerce",
    icon: "wayfair",
    description: "Wayfair engages in the e-commerce business, offering furniture, décor, housewares, and home improvement products."
  },
  {
    symbol: "ZM",
    companyName: "Zoom Video Communications",
    sector: "Internet",
    icon: "zoom",
    description: "Zoom provides a communications platform that connects people through video, voice, chat, and content sharing."
  },
  {
    symbol: "DOCU",
    companyName: "DocuSign Inc.",
    sector: "Internet",
    icon: "docusign",
    description: "DocuSign provides electronic signature software and digital transaction management services."
  },
  {
    symbol: "TWLO",
    companyName: "Twilio Inc.",
    sector: "Internet",
    icon: "twilio",
    description: "Twilio provides a cloud communications platform that enables developers to build, scale, and operate customer engagement within software applications."
  },
  {
    symbol: "OKTA",
    companyName: "Okta Inc.",
    sector: "Internet",
    icon: "okta",
    description: "Okta provides identity management solutions for enterprises, small and medium-sized businesses, universities, non-profits, and government agencies."
  },
  {
    symbol: "SNOW",
    companyName: "Snowflake Inc.",
    sector: "Internet",
    icon: "snowflake",
    description: "Snowflake provides a cloud-based data platform that enables customers to consolidate data into a single source of truth."
  },
  {
    symbol: "ATLS",
    companyName: "Atlassian Corporation",
    sector: "Internet",
    icon: "atlassian",
    description: "Atlassian designs, develops, licenses, and maintains various software products for team collaboration and productivity."
  },
  {
    symbol: "GIT",
    companyName: "GitHub Inc.",
    sector: "Internet",
    icon: "github",
    description: "GitHub provides a developer platform that allows developers to create, store, manage, and share their code."
  },
  {
    symbol: "FIVN",
    companyName: "Five9 Inc.",
    sector: "Internet",
    icon: "five9",
    description: "Five9 provides cloud software for contact centers, facilitating customer service, sales, and marketing interactions."
  },

  // =========================
  // FINTECH & PAYMENTS (36–50)
  // =========================
  {
    symbol: "V",
    companyName: "Visa Inc.",
    sector: "Fintech",
    icon: "visa",
    description: "Visa Inc. operates as a payments technology company worldwide. It facilitates digital payments among consumers, merchants, financial institutions, and government entities."
  },
  {
    symbol: "MA",
    companyName: "Mastercard Inc.",
    sector: "Fintech",
    icon: "mastercard",
    description: "Mastercard Incorporated is a technology company in the global payments industry. It connects consumers, financial institutions, merchants, governments, and businesses."
  },
  {
    symbol: "PYPL",
    companyName: "PayPal Holdings",
    sector: "Fintech",
    icon: "paypal",
    description: "PayPal operates a technology platform that enables digital payments on behalf of merchants and consumers worldwide."
  },
  {
    symbol: "SQ",
    companyName: "Block Inc.",
    sector: "Fintech",
    icon: "block",
    description: "Block Inc. (formerly Square) creates tools that enable sellers to accept card payments and provides reporting, analytics, and next-day settlement."
  },
  {
    symbol: "COIN",
    companyName: "Coinbase Global",
    sector: "Fintech",
    icon: "coinbase",
    description: "Coinbase provides a financial infrastructure and technology platform for the cryptoeconomy, serving retail users, institutions, and ecosystem partners."
  },
  {
    symbol: "ADYEN",
    companyName: "Adyen NV",
    sector: "Fintech",
    icon: "adyen",
    description: "Adyen operates a payments platform that integrates the full payments stack, including gateway, risk management, processing, and acquiring."
  },
  {
    symbol: "FIS",
    companyName: "Fidelity National Info",
    sector: "Fintech",
    icon: "fis",
    description: "FIS provides technology solutions for financial institutions and businesses worldwide, focusing on retail and institutional banking, payments, and capital markets."
  },
  {
    symbol: "INTU",
    companyName: "Intuit Inc.",
    sector: "Fintech",
    icon: "intuit",
    description: "Intuit provides financial management and compliance products and services for small businesses, self-employed, and accounting professionals."
  },
  {
    symbol: "AFRM",
    companyName: "Affirm Holdings",
    sector: "Fintech",
    icon: "affirm",
    description: "Affirm operates a platform for digital and mobile-first commerce, offering installment loans for consumers at the point of sale."
  },
  {
    symbol: "SOFI",
    companyName: "SoFi Technologies",
    sector: "Fintech",
    icon: "sofi",
    description: "SoFi is a member-centric, one-stop digital financial services on-the-go platform that helps members borrow, save, spend, invest, and protect their money."
  },
  {
    symbol: "WISE",
    companyName: "Wise Plc",
    sector: "Fintech",
    icon: "wise",
    description: "Wise is a global technology company building the best way to move money around the world."
  },
  {
    symbol: "PAY",
    companyName: "Payoneer",
    sector: "Fintech",
    icon: "payoneer",
    description: "Payoneer operates a commerce technology company that powers payments and growth for the new global economy."
  },
  {
    symbol: "STNE",
    companyName: "StoneCo",
    sector: "Fintech",
    icon: "stone",
    description: "StoneCo is a provider of financial technology solutions that empower merchants and integrated partners to conduct electronic commerce across in-store, online, and mobile channels."
  },
  {
    symbol: "NU",
    companyName: "Nubank",
    sector: "Fintech",
    icon: "nubank",
    description: "Nubank operates as a digital banking platform, offering credit cards, personal loans, and savings accounts."
  },
  {
    symbol: "UPST",
    companyName: "Upstart Holdings",
    sector: "Fintech",
    icon: "upstart",
    description: "Upstart operates a cloud-based artificial intelligence (AI) lending platform that connects consumers to banks and credit unions."
  },

  // =========================
  // BANKING (51–60)
  // =========================
  {
    symbol: "JPM",
    companyName: "JPMorgan Chase",
    sector: "Banking",
    icon: "jpmorgan",
    description: "JPMorgan Chase & Co. is a leading global financial services firm with assets involved in investment banking, financial services for consumers, and commercial banking."
  },
  {
    symbol: "BAC",
    companyName: "Bank of America",
    sector: "Banking",
    icon: "bankofamerica",
    description: "Bank of America Corporation provides banking and financial products and services for individual consumers, small and middle-market businesses, and large corporations."
  },
  {
    symbol: "WFC",
    companyName: "Wells Fargo",
    sector: "Banking",
    icon: "wellsfargo",
    description: "Wells Fargo & Company is a diversified, community-based financial services company with a vision to satisfy customers' financial needs and help them succeed financially."
  },
  {
    symbol: "GS",
    companyName: "Goldman Sachs",
    sector: "Banking",
    icon: "goldmansachs",
    description: "The Goldman Sachs Group, Inc. is a leading global investment banking, securities, and investment management firm."
  },
  {
    symbol: "MS",
    companyName: "Morgan Stanley",
    sector: "Banking",
    icon: "morganstanley",
    description: "Morgan Stanley is a global financial services firm that provides investment banking, securities, wealth management, and investment management services."
  },
  {
    symbol: "C",
    companyName: "Citigroup Inc.",
    sector: "Banking",
    icon: "citigroup",
    description: "Citigroup Inc. is a diversified financial service holding company that provides various financial products and services to consumers, corporations, governments, and institutions."
  },
  {
    symbol: "HSBC",
    companyName: "HSBC Holdings",
    sector: "Banking",
    icon: "hsbc",
    description: "HSBC Holdings plc is a British multinational universal bank and financial services holding company."
  },
  {
    symbol: "DB",
    companyName: "Deutsche Bank",
    sector: "Banking",
    icon: "deutschebank",
    description: "Deutsche Bank provides investment, financial, and related products and services to private individuals, corporate entities, and institutional clients."
  },
  {
    symbol: "UBS",
    companyName: "UBS Group AG",
    sector: "Banking",
    icon: "ubs",
    description: "UBS Group AG provides financial advice and solutions to private, institutional, and corporate clients worldwide, as well as to private clients in Switzerland."
  },
  {
    symbol: "BARC",
    companyName: "Barclays PLC",
    sector: "Banking",
    icon: "barclays",
    description: "Barclays PLC is a British multinational universal bank, operating as two divisions: Barclays UK and Barclays International."
  },

  // =========================
  // ENTERTAINMENT & MEDIA (61–70)
  // =========================
  {
    symbol: "NFLX",
    companyName: "Netflix Inc.",
    sector: "Entertainment",
    icon: "netflix",
    description: "Netflix is a streaming entertainment service offering TV series, documentaries, feature films, and mobile games across a wide variety of genres and languages."
  },
  {
    symbol: "DIS",
    companyName: "Walt Disney Co.",
    sector: "Entertainment",
    icon: "disney",
    description: "The Walt Disney Company is a diversified international family entertainment and media enterprise."
  },
  {
    symbol: "SPOT",
    companyName: "Spotify Technology",
    sector: "Entertainment",
    icon: "spotify",
    description: "Spotify Technology operates an audio streaming platform that provides audio content to millions of users worldwide."
  },
  {
    symbol: "WBD",
    companyName: "Warner Bros Discovery",
    sector: "Entertainment",
    icon: "warnerbros",
    description: "Warner Bros. Discovery is a leading global media and entertainment company that creates and distributes the world's most differentiated and complete portfolio of content."
  },
  {
    symbol: "ROKU",
    companyName: "Roku Inc.",
    sector: "Entertainment",
    icon: "roku",
    description: "Roku operates a TV streaming platform that connects the entire TV ecosystem around the world."
  },
  {
    symbol: "TTWO",
    companyName: "Take-Two Interactive",
    sector: "Entertainment",
    icon: "take-twointeractive",
    description: "Take-Two Interactive develops, publishes, and markets interactive entertainment for consumers around the globe."
  },
  {
    symbol: "EA",
    companyName: "Electronic Arts",
    sector: "Entertainment",
    icon: "ea",
    description: "Electronic Arts is a global leader in digital interactive entertainment, developing and delivering games, content, and online services."
  },
  {
    symbol: "U",
    companyName: "Unity Software",
    sector: "Entertainment",
    icon: "unity",
    description: "Unity is the world's leading platform for creating and operating real-time 3D (RT3D) content."
  },
  {
    symbol: "SONO",
    companyName: "Sonos Inc.",
    sector: "Entertainment",
    icon: "sonos",
    description: "Sonos designs, develops, manufactures, and sells multi-room audio products, including wireless speakers and home theater systems."
  },
  {
    symbol: "BILI",
    companyName: "Bilibili Inc.",
    sector: "Entertainment",
    icon: "bilibili",
    description: "Bilibili provides online entertainment services for the young generation in China, featuring videos, live broadcasting, and mobile games."
  },

  // =========================
  // AUTOMOTIVE & ENERGY (71–85)
  // =========================
  {
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    sector: "Automotive",
    icon: "tesla",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems."
  },
  {
    symbol: "F",
    companyName: "Ford Motor Company",
    sector: "Automotive",
    icon: "ford",
    description: "Ford Motor Company develops, delivers, and services a range of trucks, commercial cars and vans, sport utility vehicles, and Lincoln luxury vehicles."
  },
  {
    symbol: "GM",
    companyName: "General Motors",
    sector: "Automotive",
    icon: "generalmotors",
    description: "General Motors designs, builds, and sells trucks, crossovers, cars, and automobile parts and accessories worldwide."
  },
  {
    symbol: "BMW",
    companyName: "BMW Group",
    sector: "Automotive",
    icon: "bmw",
    description: "BMW Group develops, manufactures, and sells automobiles and motorcycles, and spare parts and accessories worldwide."
  },
  {
    symbol: "MBG",
    companyName: "Mercedes-Benz Group",
    sector: "Automotive",
    icon: "mercedesbenz",
    description: "Mercedes-Benz Group AG is one of the world's most successful automotive companies, focusing on high-end passenger cars and premium vans."
  },
  {
    symbol: "RIVN",
    companyName: "Rivian Automotive",
    sector: "Automotive",
    icon: "rivian",
    description: "Rivian designs, develops, manufactures, and sells electric vehicles and accessories."
  },
  {
    symbol: "XOM",
    companyName: "Exxon Mobil",
    sector: "Energy",
    icon: "exxonmobil",
    description: "Exxon Mobil Corporation explores for and produces crude oil and natural gas in the United States and internationally."
  },
  {
    symbol: "CVX",
    companyName: "Chevron Corporation",
    sector: "Energy",
    icon: "chevron",
    description: "Chevron Corporation engages in integrated energy and chemicals operations worldwide, including exploration, production, and refining."
  },
  {
    symbol: "BP",
    companyName: "BP plc",
    sector: "Energy",
    icon: "bp",
    description: "BP plc engages in the energy business worldwide, including oil and gas production, refining, and renewable energy."
  },
  {
    symbol: "SHEL",
    companyName: "Shell plc",
    sector: "Energy",
    icon: "shell",
    description: "Shell plc operates as an energy and petrochemical company, exploring for crude oil, natural gas, and natural gas liquids."
  },
  {
    symbol: "TOT",
    companyName: "TotalEnergies",
    sector: "Energy",
    icon: "totalenergies",
    description: "TotalEnergies is a broad energy company that produces and markets energies on a global scale: oil and biofuels, natural gas and green gases, renewables and electricity."
  },
  {
    symbol: "NEE",
    companyName: "NextEra Energy",
    sector: "Energy",
    icon: "nexteraenergy",
    description: "NextEra Energy generates, transmits, distributes, and sells electric power to retail and wholesale customers in North America."
  },
  {
    symbol: "PLUG",
    companyName: "Plug Power",
    sector: "Energy",
    icon: "plug",
    description: "Plug Power provides hydrogen fuel cell turnkey solutions for the electric mobility and stationary power markets."
  },
  {
    symbol: "ENPH",
    companyName: "Enphase Energy",
    sector: "Energy",
    icon: "enphase",
    description: "Enphase Energy designs, develops, manufactures, and sells home energy solutions, including solar micro-inverters and battery storage."
  },
  {
    symbol: "SEDG",
    companyName: "SolarEdge",
    sector: "Energy",
    icon: "solaredge",
    description: "SolarEdge designs, develops, and sells direct current (DC) optimized inverter systems for solar photovoltaic (PV) installations."
  },

  // =========================
  // RETAIL & HOSPITALITY (86–100)
  // =========================
  {
    symbol: "WMT",
    companyName: "Walmart Inc.",
    sector: "Retail",
    icon: "walmart",
    description: "Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide. It operates through Walmart U.S., Walmart International, and Sam's Club segments."
  },
  {
    symbol: "COST",
    companyName: "Costco Wholesale",
    sector: "Retail",
    icon: "costco",
    description: "Costco Wholesale Corporation operates membership warehouses that offer a wide selection of merchandise."
  },
  {
    symbol: "TGT",
    companyName: "Target Corporation",
    sector: "Retail",
    icon: "target",
    description: "Target Corporation operates as a general merchandise retailer in the United States, offering a variety of products across multiple categories."
  },
  {
    symbol: "HD",
    companyName: "Home Depot",
    sector: "Retail",
    icon: "homedepot",
    description: "The Home Depot, Inc. operates as a home improvement retailer, selling building materials, home improvement products, lawn and garden products, and decor products."
  },
  {
    symbol: "LOW",
    companyName: "Lowe's Companies",
    sector: "Retail",
    icon: "lowes",
    description: "Lowe's Companies, Inc. operates as a home improvement retailer in the United States, offering products for construction, maintenance, repair, and remodeling."
  },
  {
    symbol: "NKE",
    companyName: "Nike Inc.",
    sector: "Retail",
    icon: "nike",
    description: "NIKE, Inc. is the world's leading designer, marketer, and distributor of authentic athletic footwear, apparel, equipment, and accessories."
  },
  {
    symbol: "MCD",
    companyName: "McDonald's Corporation",
    sector: "Retail",
    icon: "mcdonalds",
    description: "McDonald's Corporation operates and franchises McDonald's restaurants, serving a locally relevant menu of quality food and beverages."
  },
  {
    symbol: "SBUX",
    companyName: "Starbucks Corporation",
    sector: "Retail",
    icon: "starbucks",
    description: "Starbucks Corporation operates as a roaster, marketer, and retailer of specialty coffee worldwide."
  },
  {
    symbol: "ABNB",
    companyName: "Airbnb Inc.",
    sector: "Hospitality",
    icon: "airbnb",
    description: "Airbnb operates a platform that enables hosts to offer stays and experiences to guests worldwide."
  },
  {
    symbol: "BKNG",
    companyName: "Booking Holdings",
    sector: "Hospitality",
    icon: "bookingdotcom",
    description: "Booking Holdings provides travel and restaurant online reservation and related services worldwide through various brands."
  },
];