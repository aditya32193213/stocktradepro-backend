# 🚀 Complete Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download](https://git-scm.com/)

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/stocktradepro-backend.git
cd stocktradepro-backend
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

---

## Step 3: Environment Configuration

### Create .env file

```bash
cp .env.example .env
```

### Configure MongoDB

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (free tier works fine)
   - Click "Connect" → "Connect your application"
   - Copy the connection string

2. **Update .env with MongoDB URI:**
   ```bash
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/stocktradepro?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_USERNAME` with your MongoDB username
   - `YOUR_PASSWORD` with your MongoDB password
   - `YOUR_CLUSTER` with your cluster URL

### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the generated string and paste it in `.env`:
```bash
JWT_SECRET=your_generated_secret_here
```

### Configure CORS (Optional)

```bash
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

Add your frontend URLs separated by commas.

---

## Step 4: Database Seeding

Populate the database with 100 stock records:

```bash
npm run seed
```

Expected output:
```
✅ MongoDB connected for seeding
🧹 Stocks collection cleared
🌱 100 stocks seeded successfully
🎉 Seeding completed
🔌 MongoDB connection closed
```

---

## Step 5: Start the Development Server

```bash
npm run dev
```

Expected output:
```
APP NODE_ENV = development
✅ Environment variables validated
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 10000
📘 API Documentation: http://localhost:10000/api-docs
❤️  Health Check: http://localhost:10000/api/v1/health
```

---

## Step 6: Verify Installation

### Test Health Endpoint

```bash
curl http://localhost:10000/api/v1/health
```

Expected response:
```json
{
  "status": "OK",
  "uptime": 12.345,
  "timestamp": "2024-01-10T10:30:00.000Z",
  "database": {
    "status": "connected",
    "connected": true
  },
  "memory": {
    "used": "45MB",
    "total": "120MB"
  }
}
```

### Access API Documentation

Open your browser and navigate to:
```
http://localhost:10000/api-docs
```

You should see the Swagger UI with all API endpoints documented.

---

## Step 7: Test API Endpoints

### Register a User

```bash
curl -X POST http://localhost:10000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "pan": "ABCDE1234F",
    "password": "Test@1234"
  }'
```

### Login

```bash
curl -X POST http://localhost:10000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test@1234"
  }'
```

Save the `token` from the response.

### Get Stocks (with authentication)

```bash
curl -X GET http://localhost:10000/api/v1/stocks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Error

**Error:** `MongoServerError: bad auth`

**Solution:**
1. Check your MongoDB username and password in `.env`
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify the connection string format

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::10000`

**Solution:**
```bash
# Kill the process using port 10000
lsof -ti:10000 | xargs kill -9

# Or use a different port in .env
PORT=3000
```

### Issue: JWT_SECRET Too Short

**Error:** `JWT_SECRET must be at least 32 characters long`

**Solution:**
Generate a new secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Production Deployment

### Environment Variables (Render/Heroku)

Set these environment variables in your hosting platform:

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Health Check Endpoint

Configure your hosting platform to use:
```
/api/v1/health
```

---

## Additional Scripts

```bash
# Run tests
npm test

# Start production server
npm start

# Lint code (if configured)
npm run lint

# Format code (if configured)
npm run format
```

---

## Next Steps

1. ✅ Complete the setup steps above
2. 📖 Read the [SECURITY.md](./SECURITY.md) guide
3. 🧪 Run tests: `npm test`
4. 📝 Review API documentation at `/api-docs`
5. 🚀 Start building your frontend!

---

## Support

If you encounter any issues:

1. Check the [Common Issues](#common-issues--solutions) section
2. Review the logs for error messages
3. Ensure all environment variables are set correctly
4. Verify your MongoDB connection

For additional help, create an issue on GitHub.