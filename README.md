# 📈🚀 StockTradePro – Backend API

A production-grade backend for StockTradePro, a full-stack fintech stock trading platform 💹
This API powers authentication 🔐, stock listings 📊, transactions 💰, watchlists ⭐, and portfolio logic, built with scalability, security, and clean architecture in mind.

# 🌟✨ Project Overview

StockTradePro Backend provides robust REST APIs for a simulated trading platform where users can:

- 👤 Register & Login securely
- 📈 Browse stocks with search, filters & pagination
- 💸 Buy & Sell stocks with balance validation
- ⭐ Maintain a personal watchlist
- 🧾 Track transaction history
- 📄 Explore APIs via Swagger UI

Designed using industry-standard backend practices with a modular, scalable architecture.

---

# 🎯🧠 Key Design Goals

- 🧩 Clean Architecture (Routes → Controllers → Services → Models)
- 🔐 Secure JWT-based authentication
- ⚡ Optimized MongoDB queries with indexes
- 📘 Well-documented APIs (Swagger/OpenAPI)
- 🌱 Realistic seeded stock data
- 🛡️ Production-ready middleware & error handling

---

# 🌐 Live Backend API  
- 🔗 **[https://stocktradepro-backend.onrender.com/](https://stocktradepro-backend.onrender.com/)**

---

# 🛠️⚙️ Tech Stack

| 🔹 Layer          | 🧰 Technology                    |
| ----------------   | -------------------------------  |
| 🧠 Runtime        | Node.js (ES Modules)             |
| 🚀 Framework      | Express.js                       |
| 🗄️ Database       | MongoDB + Mongoose               |
| 🔑 Authentication | JWT                              |
| ✅ Validation     | express-validator                |
| 🛡️ Security       | Helmet, Rate Limiting            |
| 📜 Logging        | Winston                          |
| 📄 Docs           | Swagger (OpenAPI 3.0)            |
| 🧪 Testing        | Jest (minimal & ESM-compatible)  |
| ☁️ Deployment     | Render-ready                     |

---

# 🗂️📁 Project Structure
```plaintext
server/
│
├── app.js                # 🚀 Express app configuration
├── server.js             # 🟢 Server bootstrap
│
├── config/               # ⚙️ Configurations
│   ├── db.js             # 🗄️ MongoDB connection
│   └── swagger.js        # 📄 Swagger setup
│
├── routes/               # 🛣️ API routes
│   ├── auth.routes.js
│   ├── stock.routes.js
│   ├── transaction.routes.js
│   ├── watchlist.routes.js
│   ├── health.routes.js
│   └── index.js
│
├── controllers/          # 🎮 Thin controllers
├── services/             # 🧠 Business logic layer
├── models/               # 🧬 Mongoose schemas & indexes
├── middleware/           # 🛡️ Auth, errors, rate limiting
│
├── seed/                 # 🌱 Database seeding
├── tests/                # 🧪 Minimal Jest tests
├── utils/                # 🧰 Logger, JWT helpers
│
└── .env                  # 🔐 Environment variables
```

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

## 📊✨ Core Features

- 👤🔐 Authentication
- User registration & login
- Secure password hashing
- JWT-based authorization
- 🚦 Rate-limited login attempts

---

## 📈📉 Stocks

- Public stock listings
- 🔍 Search by company name or symbol
- 🏷️ Filter by sector
- 📄 Pagination support
- 💹 Realistic stock prices & metrics

---

## 💰🧾 Transactions

- Buy & sell stocks
- 💳 Balance validation
- 📦 Quantity ownership checks
- 🗂️ Transaction history tracking

---

## ⭐📌 Watchlist

- Add / remove stocks
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

Swagger UI available at:
```bash
/api-docs
```

Includes:
- 📥 Request / response schemas
- 🔐 Auth requirements
- 🔍 Query parameters
- ⚠️ Error responses

---

🧪🧠 Testing Strategy

- Minimal Jest setup
- ✅ Health endpoint tested
- ⏭️ DB-heavy tests intentionally skipped
- Focus on API stability & documentation

---

# ⚙️🔐 Environment Variables

- Create a .env file:
```bash
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

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

## 🔮✨ Future Enhancements

- 📡 Real-time stock price updates
- 📊 Portfolio aggregation APIs
- ⏱️ Background jobs for market sync
- 🧑‍💼 Role-based access control (RBAC)
- ⚡ Redis caching layer

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

## 👨‍💻✨ Author

Aditya
🚀 Full Stack Developer (React • Node.js • MongoDB)