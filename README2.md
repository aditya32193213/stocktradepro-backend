# 🚀 StockTradePro - Backend API

<div align="center">

![StockTradePro API](https://img.shields.io/badge/StockTradePro-REST%20API-success?style=for-the-badge&logo=node.js)

**A Robust, Scalable REST API for Stock Trading Platform**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://swagger.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[📖 API Docs](http://localhost:10000/api-docs) • [🔧 Installation](#-installation) • [🎯 Features](#-features) • [🐛 Report Bug](#)

</div>

---

## 🌟 Overview

StockTradePro Backend is a production-ready REST API built with Node.js, Express, and MongoDB. It provides comprehensive endpoints for user authentication, stock trading, portfolio management, and real-time market data.

### ✨ Key Highlights

- 🔐 **JWT Authentication** - Secure token-based auth with bcrypt password hashing
- 💾 **MongoDB** - NoSQL database with Mongoose ODM
- 📊 **Transaction Safety** - Atomic operations with MongoDB transactions
- 🛡️ **Security First** - Rate limiting, helmet, CORS, input sanitization
- 📝 **Comprehensive Logging** - Winston logger for production-grade logging
- 📚 **Auto-generated Docs** - Swagger/OpenAPI documentation
- ⚡ **High Performance** - Gzip compression, optimized queries
- 🔄 **Graceful Shutdown** - Proper cleanup on server stop

---

## 🎯 Features

### 🔐 **Authentication & Authorization**
- ✅ User registration with PAN & mobile validation
- ✅ JWT-based authentication (24h token expiry)
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Protected routes with middleware
- ✅ User profile management
- ✅ Rate limiting on auth endpoints (10 attempts/15min)

### 📊 **Stock Management**
- 📈 List all stocks with pagination (up to 100/page)
- 🔍 Search by company name or symbol (case-insensitive)
- 🏷️ Filter by sector
- 🔤 Sort by symbol, name, market cap, price, change%
- 🎯 Get individual stock details
- 📊 Real-time price updates (simulated)

### 💸 **Trading System**
- ⚡ Buy stocks with balance validation
- 💰 Sell stocks with ownership verification
- 🔒 Atomic transactions (MongoDB sessions)
- 📝 Transaction notes (up to 500 chars)
- 🚫 Race condition prevention
- ✅ Insufficient balance checks
- ✅ Insufficient stock checks

### 💼 **Portfolio Analytics**
- 📊 Real-time portfolio value calculation
- 💹 Profit/Loss tracking (realized & unrealized)
- 📈 Average buy price calculation
- 💵 Current market value
- 🎯 Returns percentage per stock
- 📉 Comprehensive P&L breakdown

### 📋 **Transaction History**
- 🗓️ Date range filtering (ISO 8601 format)
- 🔍 Filter by type (BUY/SELL)
- 🏢 Filter by stock
- ♾️ Pagination support (20 per page default)
- 📄 Export to PDF
- 📊 Export to CSV
- 📝 Includes transaction notes

### ⭐ **Watchlist**
- ➕ Add stocks to watchlist
- 🗑️ Remove from watchlist
- 👀 View all watched stocks
- 🚫 Duplicate prevention (unique index)
- ♾️ Pagination support

### 📊 **Dashboard**
- 💰 Available balance
- 💵 Net invested amount
- 📦 Total holdings count
- ⭐ Watchlist count
- 🔄 Real-time updates

---

## 🛠️ Tech Stack

### **Core Technologies**

| Technology | Purpose | Version |
|------------|---------|---------|
| 🟢 **Node.js** | Runtime Environment | 20.x |
| 🚂 **Express.js** | Web Framework | 4.21.2 |
| 🍃 **MongoDB** | Database | 8.x |
| 🦡 **Mongoose** | ODM | 8.9.3 |

### **Security**

| Package | Purpose | Version |
|---------|---------|---------|
| 🔐 **jsonwebtoken** | JWT Auth | 9.0.2 |
| 🔒 **bcryptjs** | Password Hashing | 2.4.3 |
| 🛡️ **helmet** | Security Headers | 8.0.0 |
| 🚫 **express-rate-limit** | Rate Limiting | 7.5.0 |
| 🧹 **express-mongo-sanitize** | NoSQL Injection Prevention | 2.2.0 |
| 🌐 **cors** | CORS Handling | 2.8.5 |

### **Utilities**

| Package | Purpose | Version |
|---------|---------|---------|
| 📝 **winston** | Logging | 3.17.0 |
| ✅ **express-validator** | Input Validation | 7.2.1 |
| 📚 **swagger-jsdoc** | API Docs Generator | 6.2.8 |
| 📖 **swagger-ui-express** | API Docs UI | 5.0.1 |
| 📄 **pdfkit** | PDF Generation | 0.15.1 |
| 🗜️ **compression** | Gzip Compression | 1.7.5 |

---

## 📁 Project Structure

```
backend/
│
├── 📂 config/                  # Configuration files
│   ├── db.js                   # MongoDB connection
│   └── swagger.js              # Swagger/OpenAPI config
│
├── 📂 controllers/             # Route controllers
│   ├── auth.controller.js
│   ├── dashboard.controller.js
│   ├── portfolio.controller.js
│   ├── stock.controller.js
│   ├── transaction.controller.js
│   ├── watchlist.controller.js
│   └── index.js
│
├── 📂 middleware/              # Custom middleware
│   ├── auth.middleware.js      # JWT verification
│   ├── error.middleware.js     # Global error handler
│   ├── rateLimit.middleware.js # Rate limiting
│   ├── requestId.middleware.js # Request ID generation
│   ├── requestLogger.middleware.js
│   ├── mongoSanitize.middleware.js
│   ├── validate.middleware.js
│   └── index.js
│
├── 📂 models/                  # Mongoose models
│   ├── User.js
│   ├── Stock.js
│   ├── Transaction.js
│   ├── Watchlist.js
│   └── index.js
│
├── 📂 routes/                  # API routes
│   └── 📂 v1/
│       ├── auth.routes.js
│       ├── dashboard.routes.js
│       ├── health.routes.js
│       ├── portfolio.routes.js
│       ├── stock.routes.js
│       ├── transaction.routes.js
│       ├── watchlist.routes.js
│       └── index.js
│
├── 📂 services/                # Business logic
│   ├── auth.service.js
│   ├── dashboard.service.js
│   ├── portfolio.service.js
│   ├── stock.service.js
│   ├── transaction.service.js
│   ├── watchlist.service.js
│   └── index.js
│
├── 📂 utils/                   # Utility functions
│   ├── AppError.js             # Custom error class
│   ├── generateToken.js        # JWT token generator
│   ├── logger.js               # Winston logger
│   ├── validateEnv.js          # Env validation
│   └── index.js
│
├── 📂 validations/             # Input validation rules
│   ├── auth.validation.js
│   ├── stock.validation.js
│   ├── transaction.validation.js
│   ├── watchlist.validation.js
│   └── index.js
│
├── app.js                      # Express app setup
├── server.js                   # Server entry point
├── .env.example                # Environment template
└── package.json
```

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:

- 📦 **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- 🍃 **MongoDB** (v8 or higher) - [Download](https://www.mongodb.com/try/download/community)
- 📦 **npm** (v9 or higher) - Comes with Node.js

### **Installation**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/stocktradepro-backend.git
cd stocktradepro-backend
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=10000
BASE_URL=http://localhost:10000

# Database
MONGO_URI=mongodb://localhost:27017/stocktradepro

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRES_IN=24h

# Optional: For production
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stocktradepro
```

⚠️ **Security Note**: Never commit `.env` to version control!

4️⃣ **Start MongoDB** (if running locally)

```bash
# macOS/Linux
mongod

# Windows
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
```

5️⃣ **Start the development server**

```bash
npm run dev
```

🎉 **Success!** API is running at [http://localhost:10000](http://localhost:10000)

📚 **View API Docs** at [http://localhost:10000/api-docs](http://localhost:10000/api-docs)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server (with nodemon) |
| `npm start` | ▶️ Start production server |
| `npm test` | 🧪 Run tests (if configured) |

---

## 🌐 API Endpoints

### **Base URL**
```
http://localhost:10000/api/v1
```

### **Authentication** 🔐

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `GET` | `/auth/profile` | Get user profile | ✅ |
| `PUT` | `/auth/profile` | Update profile | ✅ |

### **Stocks** 📊

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/stocks` | List all stocks | ❌ |
| `GET` | `/stocks/:id` | Get stock details | ❌ |

**Query Parameters for `/stocks`:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search by symbol/company name
- `sector` - Filter by sector
- `sortBy` - Sort field (symbol, companyName, marketCap, price, changePercent)
- `order` - Sort order (asc, desc)

### **Trading** 💸

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/transactions/buy` | Buy stock | ✅ |
| `POST` | `/transactions/sell` | Sell stock | ✅ |
| `GET` | `/transactions` | Transaction history | ✅ |
| `GET` | `/transactions/export/pdf` | Export as PDF | ✅ |
| `GET` | `/transactions/export/csv` | Export as CSV | ✅ |

**Query Parameters for `/transactions`:**
- `page` - Page number
- `limit` - Items per page
- `type` - Filter by type (BUY, SELL)
- `stockId` - Filter by stock
- `fromDate` - Start date (ISO 8601)
- `toDate` - End date (ISO 8601)

### **Portfolio** 💼

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/portfolio` | Get portfolio with P&L | ✅ |

### **Watchlist** ⭐

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/watchlist` | Add to watchlist | ✅ |
| `GET` | `/watchlist` | Get watchlist | ✅ |
| `DELETE` | `/watchlist/:id` | Remove from watchlist | ✅ |

### **Dashboard** 📊

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/dashboard/summary` | Dashboard summary | ✅ |

### **Health** ❤️

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/health` | Health check | ❌ |

---

## 🔐 Authentication

### **JWT Token Structure**

```json
{
  "id": "userId",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### **Protected Routes**

Include JWT token in request headers:

```http
Authorization: Bearer <your_jwt_token>
```

### **Token Expiry**

- Default: **24 hours**
- Configurable via `JWT_EXPIRES_IN` environment variable

---

## 📊 Database Schema

### **User Model**

```javascript
{
  name: String (required, 2-100 chars),
  email: String (required, unique, lowercase),
  mobile: String (required, 10 digits),
  pan: String (required, unique, uppercase, format: ABCDE1234F),
  password: String (required, hashed, min 8 chars),
  balance: Number (default: 100000),
  createdAt: Date,
  updatedAt: Date
}
```

### **Stock Model**

```javascript
{
  symbol: String (required, unique, uppercase, indexed),
  companyName: String (required),
  sector: String (required, indexed),
  logoUrl: String (required),
  price: Number (required),
  changePercent: Number (default: 0),
  volume: Number (default: 0),
  peRatio: Number,
  marketCap: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Transaction Model**

```javascript
{
  user: ObjectId (ref: User, required),
  stock: ObjectId (ref: Stock, required),
  type: String (enum: [BUY, SELL], required),
  quantity: Number (required),
  price: Number (required),
  totalAmount: Number (required),
  notes: String (max: 500 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### **Watchlist Model**

```javascript
{
  user: ObjectId (ref: User, required, indexed),
  stock: ObjectId (ref: Stock, required, indexed),
  createdAt: Date,
  updatedAt: Date
}

// Unique compound index: (user, stock)
```

---

## 🛡️ Security Features

### **1. Password Security**
- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Never stored in plain text
- ✅ Selected out by default in queries

### **2. JWT Security**
- ✅ Signed with secret key (min 32 chars)
- ✅ 24-hour expiry
- ✅ Verified on protected routes

### **3. Rate Limiting**

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/login` | 10 requests | 15 minutes |
| `/transactions/buy` | 20 requests | 1 minute |
| `/transactions/sell` | 20 requests | 1 minute |
| All other `/api/*` | 100 requests | 15 minutes |

### **4. Input Validation**
- ✅ Express-validator for all inputs
- ✅ MongoDB query sanitization
- ✅ Email format validation
- ✅ PAN format validation (Indian format)
- ✅ Mobile number validation (10 digits)
- ✅ Password strength requirements

### **5. Security Headers (Helmet)**
- ✅ Content Security Policy
- ✅ XSS Protection
- ✅ MIME type sniffing prevention
- ✅ Clickjacking prevention

### **6. CORS**
- ✅ Configurable origins
- ✅ Credentials support

---

## 📝 Logging

### **Winston Logger Configuration**

**Development Mode:**
- Colorized console output
- Timestamp format: `YYYY-MM-DD HH:mm:ss`
- Pretty-printed messages

**Production Mode:**
- JSON format
- Structured logs
- Error stack traces
- Request IDs

**Log Levels:**
- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `debug` - Debug messages (dev only)

---

## 🔄 MongoDB Transactions

### **Atomic Operations**

All buy/sell operations use MongoDB transactions to ensure:

1. ✅ **Atomicity** - All or nothing
2. ✅ **Consistency** - Valid state always
3. ✅ **Isolation** - No race conditions
4. ✅ **Durability** - Committed changes persist

**Example:**

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Update user balance
  await User.updateOne(...).session(session);
  
  // Create transaction record
  await Transaction.create([...], { session });
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

---

## 📊 Performance Optimizations

### **1. Database Indexing**

```javascript
// User
email: indexed
pan: indexed

// Stock
symbol: indexed
sector: indexed
(sector, marketCap): compound indexed

// Transaction
(user, createdAt): compound indexed
(user, type): compound indexed

// Watchlist
(user, stock): unique compound indexed
```

### **2. Query Optimization**
- ✅ Lean queries (returns plain JS objects)
- ✅ Projection (select only needed fields)
- ✅ Pagination (limit results)
- ✅ Aggregation pipelines for complex queries

### **3. Compression**
- ✅ Gzip compression for all responses
- ✅ Reduces bandwidth by ~70%

### **4. Connection Pooling**

```javascript
MongoDB Connection Pool:
- minPoolSize: 2
- maxPoolSize: 10
- serverSelectionTimeoutMS: 5000
- socketTimeoutMS: 45000
```

---

## 🚨 Error Handling

### **Custom Error Class**

```javascript
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
```

### **Global Error Handler**

Handles:
- ✅ Custom AppError instances
- ✅ Mongoose validation errors
- ✅ MongoDB duplicate key errors
- ✅ JWT errors (invalid, expired)
- ✅ Cast errors (invalid ObjectId)

### **Error Response Format**

```json
{
  "status": "error",
  "message": "Error message here",
  "stack": "..." // Only in development
}
```

---

## 📚 API Documentation

### **Swagger/OpenAPI**

Access interactive API documentation at:

```
http://localhost:10000/api-docs
```

Features:
- ✅ Try out endpoints directly
- ✅ JWT authentication support
- ✅ Request/response examples
- ✅ Schema definitions
- ✅ Auto-generated from JSDoc comments

---

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run with coverage
npm run test:coverage
```

---

## 🚀 Deployment

### **Environment Setup**

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET` (min 32 chars)
3. Set production `MONGO_URI`
4. Configure `BASE_URL`

### **Deployment Platforms**

#### **Render** (Recommended)

```yaml
# render.yaml
services:
  - type: web
    name: stocktradepro-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

#### **Heroku**

```bash
heroku create stocktradepro-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGO_URI=your_mongo_uri
git push heroku main
```

#### **Docker**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 10000
CMD ["node", "server.js"]
```

```bash
docker build -t stocktradepro-api .
docker run -p 10000:10000 --env-file .env stocktradepro-api
```

---

## 🔍 Monitoring & Debugging

### **Health Check Endpoint**

```bash
curl http://localhost:10000/api/v1/health
```

**Response:**

```json
{
  "status": "OK",
  "uptime": 3600,
  "timestamp": "2024-01-13T10:00:00.000Z",
  "database": {
    "status": "connected",
    "connected": true
  },
  "memory": {
    "used": "120MB",
    "total": "512MB"
  }
}
```

### **Request Tracing**

All requests include:
- ✅ Unique Request ID (UUID)
- ✅ Request/response logging
- ✅ Performance timing
- ✅ Error stack traces

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 💾 Commit your changes
4. 📤 Push to the branch
5. 🔁 Open a Pull Request

### **Code Standards**

- Use ESLint configuration
- Follow Node.js best practices
- Write meaningful commit messages
- Add JSDoc comments
- Update Swagger documentation

---

## 📝 Changelog

### **v1.0.0** (Current)

#### ✨ Features
- Complete authentication system with JWT
- Stock management with search and filters
- Trading system with atomic transactions
- Portfolio analytics with P&L tracking
- Transaction history with export (PDF/CSV)
- Watchlist functionality
- Dashboard summary
- User profile management
- Transaction notes

#### 🛡️ Security
- Rate limiting on all endpoints
- Input validation with express-validator
- MongoDB query sanitization
- Helmet security headers
- CORS configuration

#### ⚡ Performance
- Database indexing
- Connection pooling
- Gzip compression
- Query optimization

---

## 🆘 Troubleshooting

### **Common Issues**

**Problem:** MongoDB connection fails

**Solution:**
```bash
# Check MongoDB is running
mongod --version

# Check connection string
echo $MONGO_URI

# Try connection
mongosh $MONGO_URI
```

**Problem:** JWT validation fails

**Solution:**
- Ensure JWT_SECRET is set and > 32 chars
- Check token expiry
- Verify token format: `Bearer <token>`

**Problem:** Rate limit errors

**Solution:**
- Wait for the window to reset
- Increase limits in `rateLimit.middleware.js`

---

## 📚 Resources

- 📖 [Express.js Docs](https://expressjs.com/)
- 🍃 [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- 🦡 [Mongoose Docs](https://mongoosejs.com/docs/)
- 🔐 [JWT.io](https://jwt.io/)
- 📝 [Winston Logger](https://github.com/winstonjs/winston)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Built with ⚡ by the StockTradePro Backend Team**

- 🏗️ **Architecture**: RESTful API design
- 💾 **Database**: MongoDB with optimized schemas
- 🔐 **Security**: Industry-standard practices
- 📊 **Performance**: Optimized for scale

---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

## 📞 Contact

- 📧 Email: support@stocktradepro.com
- 🐦 Twitter: [@StockTradePro](https://twitter.com/stocktradepro)
- 💬 Discord: [Join our community](https://discord.gg/stocktradepro)

---

<div align="center">

**Built with 💚 using Node.js, Express, and MongoDB**

[⬆ Back to Top](#-stocktradepro---backend-api)

</div>