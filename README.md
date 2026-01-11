# 📈🚀 StockTradePro – Backend API
## 🔐 Secure • ⚡ Scalable • 🏦 Fintech-Ready Backend
### 📌✨ Overview

StockTradePro Backend is a production-ready REST API 🧩 built for a fintech stock trading platform 💹
This API powers authentication 🔐, stock listings 📊, transactions 💰, watchlists ⭐, and portfolio logic, built with scalability, security, and clean architecture in mind.

---

# 🌟✨ Project Overview

StockTradePro Backend provides robust REST APIs for a simulated trading platform where users can:

- 👤 Register & Login securely
- 📈 Browse stocks with search, filters & pagination
- 💸 Buy & Sell stocks with balance validation
- ⭐ Maintain a personal watchlist
- 🧾 Track transaction history
- 📄 Explore APIs via Swagger UI
- 🔐 Secure authentication
- 📊 Portfolio & dashboard analytics
- 💸 Buy/Sell stock transactions
- ⭐ Watchlists
- 🧾 Transaction history & exports

Designed using industry-standard backend practices with a modular, scalable architecture.

---

## 📚📖 Documentation

- 🛠️ [Setup & Installation Guide](./SETUP.md)
- 🔐 [Security Policy](./SECURITY.md)

---

# 🎯🧠 Key Design Goals

- 🧩 Clean Architecture (Routes → Controllers → Services → Models)
- 🔐 Secure JWT-based authentication
- ⚡ Optimized MongoDB queries with indexes
- 📘 Well-documented APIs (Swagger/OpenAPI)
- 🌱 Realistic seeded stock data
- 🛡️ Production-ready middleware & error handling

---

# 🌐🚀 Live Deployment
- 🔗 Backend API
👉**[https://stocktradepro-backend.onrender.com/](https://stocktradepro-backend.onrender.com/)**

- 📘 Swagger Docs
👉**[https://stocktradepro-backend.onrender.com/api-docs](https://stocktradepro-backend.onrender.com/api-docs)**

- ❤️ Health Check
👉**[https://stocktradepro-backend.onrender.com/api/v1/health](https://stocktradepro-backend.onrender.com/api/v1/health)**

---

# 🛠️⚙️ Tech Stack

| 🔹 Layer          | 🧰 Technology                    |
| ----------------   | -------------------------------  |
| 🧠 Runtime        | 🟢 Node.js (ES Modules)          |
| 🚀 Framework      | ⚡Express.js                     |
| 🗄️ Database       | 🍃MongoDB + 📦Mongoose           |
| 🔑 Authentication | 🔑JWT                            |
| ✅ Validation     | express-validator                |
| 🛡️ Security       | 🪖 Helmet, Rate Limiting         |
| 📜 Logging        | Winston                          |
| 📄 Docs           | Swagger (OpenAPI 3.0)            |
| 🧪 Testing        | Jest (minimal & ESM-compatible)  |
| ☁️ Deployment     | Render-ready                     |

---

# 🗂️📁 Project Structure
```plaintext
backend/
│
├── config/           ⚙️ DB & Swagger configuration
├── controllers/      🎮 Request handling
├── services/         🧠 Business logic
├── models/           🗄️ Database schemas
├── routes/           🌐 API routes (v1)
├── middleware/       🛡️ Auth, validation, logging
├── utils/            🔧 Helpers & utilities
├── tests/            🧪 Jest + Supertest
├── app.js            🚀 Express app setup
├── server.js         🔄 Server bootstrap
├── README.md         📘 Project overview
├── SETUP.md          🛠️ Setup instructions
└── SECURITY.md       🔐 Security policy
```

---


🔄🔗 API Flow Architecture
```plaintext
Client 🧑‍💻
  ↓
Routes 🌐
  ↓
Middleware 🛡️
  ↓
Controllers 🎮
  ↓
Services 🧠
  ↓
MongoDB 🍃
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Stocks
- `GET /api/v1/stocks` - List all stocks (with pagination, search, filters)
- `GET /api/v1/stocks/:id` - Get stock details

### Transactions
- `POST /api/v1/transactions/buy` - Buy stocks
- `POST /api/v1/transactions/sell` - Sell stocks
- `GET /api/v1/transactions` - Get transaction history
- `GET /api/v1/transactions/export/pdf` - Export as PDF
- `GET /api/v1/transactions/export/csv` - Export as CSV

### Portfolio
- `GET /api/v1/portfolio` - Get user portfolio with P&L

### Watchlist
- `POST /api/v1/watchlist` - Add stock to watchlist
- `GET /api/v1/watchlist` - Get user watchlist
- `DELETE /api/v1/watchlist/:id` - Remove from watchlist

### Dashboard
- `GET /api/v1/dashboard/summary` - Get dashboard summary

### Health
- `GET /api/v1/health` - Health check endpoint

---

## 🔐🔄 Authentication Flow
1. 👤 User registers with validated credentials
2. 🔒 Passwords are securely hashed (bcrypt)
3. 🪙 JWT token issued on successful login
4. 🔑 Protected routes require:
```plaintext
Authorization: Bearer <token>
```
---

# 📊✨ Core Features

## 🔐🛡️ Authentication & Security

- 👤🔐 User Registration & Login (JWT based)
- 🔑 Secure password hashing using bcrypt
- 🧯 Centralized error handling
- 🚦 Rate-limited login attempts
- 🚫 Rate limiting on sensitive endpoints
- 🆔 Request ID–based tracing
- 🪖 Helmet for secure HTTP headers

---

## 📈📉 Stocks Market APIs

- Public stock listings
- 🔍 Search by company name or symbol
- 🏷️ Filter by sector
- 📄 Pagination support
- 🔃 Sorting
- ⚡ Optimized queries using MongoDB indexes
- 💹 Realistic stock prices & metrics

---

## 💸💼 Trading System

- 🟢 Buy stocks
- 🔴 Sell stocks
- 🔄 Atomic transactions using MongoDB sessions
- 💰 Automatic balance updates
- 🚫 Prevent overspending & overselling
- ✅ Financial consistency guaranteed

---

## 📊📊 Portfolio & Dashboard

- 📦 User holdings summary
- 📈 Average buy price calculation
- 💹 Current market valuation
- 📉 Profit / Loss (absolute & percentage)
- 🧭 Dashboard snapshot APIs

---

## 💰🧾 Transactions History

- Buy & sell stocks
- 💳 Balance validation
- 📦 Quantity ownership checks
- 🗂️ Transaction history tracking
- 📜 Complete buy/sell history
- 🔎 Filters by:
1. 🟢 Buy / 🔴 Sell
2. 📅 Date range
3. 📈 Stock
- 📤 Export options:
1. 📄 CSV
2. 📑 PDF

---

## ⭐📌 Watchlist

- ➕ Add stocks to watchlist
- ➖ Remove stocks from watchlist
- 🚫 Prevent duplicates
- 👤 User-specific watchlists

---

## ❤️🩺 Health Check

- Simple /api/health endpoint
- 🛠️ Used for monitoring & deployments

---

## 🌱📦 Database Seeding

Includes a deterministic & realistic seeding system:
- 🏢 100 real-world companies
- 🔤 Valid stock symbols
- 🏷️ Sector classification
- 📊 Generated prices, volume & market cap
- 🔁 Safe to re-run anytime

---

# 📄📘 API Documentation (Swagger)

- 📘 Interactive Swagger UI
- 🔐 JWT-enabled API testing
- 📥 Request / response schemas
- 🔐 Auth requirements
- 🔍 Query parameters
- ⚠️ Error responses

---

## 🧪🧠 Testing

- 🧪 Unit & integration tests using:
1. Jest
2. Supertest

- ✅ Tested flows:
- ✅ Health endpoint
- Minimal Jest setup

## 🚀🛫 Deployment Ready

- 🌱 Environment-based configuration
- 🔄 Graceful shutdown (HTTP → DB)
- ☁️ Cloud-ready (Render / Docker / Linux)
- 🔐 No hardcoded secrets

---

# ⚙️🔐 Environment Variables

- Edit `.env` and set your configuration:
   
 - `MONGO_URI` - Your MongoDB connection string
 - `JWT_SECRET` - A secure secret key (min 32 characters)
 - `PORT` - Server port (default: 10000)

---

# ▶️🚀 Running the Project

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/aditya32193213/stocktradepro-backend.git
cd Stocktradepro-backend
```

## 📦 Install dependencies
```bash
npm install
```

## 🟢 Start development server
```bash
npm run dev
```

## 🌱 Seed database
```bash
npm run seed
```

## 🧪 Run tests
```bash
npm run test
```

--- 

## ☁️🚀 Deployment

The backend is Render-ready:
- 🔐 Environment-based config
- ❤️ Health check endpoint
- ❌ No hardcoded secrets
- 🛡️ Production-safe logging & error handling

---

## 🔮✨ Future Enhancements

- 📡 Real-time stock price updates
- 📊 Portfolio aggregation APIs
- ⏱️ Background jobs for market sync
- 🧑‍💼 Role-based access control (RBAC)
- ⚡ Redis caching layer

---

## 🏁🎉 Final Notes

This backend was built with a focus on:
- ✅ Correctness
- ⚡ Performance
- 🧩 Clean architecture
- 🏭 Real-world backend practices

## Perfect for:

- 🎓 Capstone evaluation
- 💼 Portfolio showcase
- 🎤 Interview discussions
-🌐 Frontend integration

---
## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻✨ Author

Aditya
- 🚀 Full Stack Developer (React • Node.js • MongoDB)
- 📍 Bangalore, India 🇮🇳

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- All open-source contributors

---

## ⭐🙌 Final Note

This backend is built not just to pass a capstone, but to reflect real-world backend engineering standards used in fintech platforms.

If you like this project, feel free to ⭐ the repository!