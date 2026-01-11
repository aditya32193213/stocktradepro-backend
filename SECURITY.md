# 🔐 Security Guide

## Environment Variables

### Setup Instructions

1. **Never commit `.env` file to git**
   ```bash
   # Ensure .env is in .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use `.env.example` as template**
   ```bash
   # Copy template to create your .env
   cp .env.example .env
   ```

3. **Generate secure JWT secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Get MongoDB connection string**
   - Log into [MongoDB Atlas](https://cloud.mongodb.com)
   - Navigate to your cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name

### Required Environment Variables

```bash
NODE_ENV=development
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_jwt_secret
```

---

## Authentication & Authorization

### JWT Token Security

- Tokens expire after 7 days
- Tokens are signed with HS256 algorithm
- JWT secret must be at least 64 characters
- Tokens are validated on every protected route

### Password Security

- Passwords are hashed using bcrypt (10 rounds)
- Plain text passwords are never stored
- Password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

---

## API Security

### Rate Limiting

All endpoints are protected by rate limiting:

- **Authentication endpoints**: 10 requests per 15 minutes
- **Transaction endpoints**: 20 requests per minute
- **General API**: 100 requests per 15 minutes

### Input Validation

- All inputs are validated using express-validator
- MongoDB queries are sanitized to prevent injection
- Request body size limited to 1MB

---

## Database Security

### Connection Security

- Always use SSL/TLS for MongoDB connections
- Use strong passwords (min 16 characters)
- Enable IP whitelisting in MongoDB Atlas
- Rotate database passwords every 90 days

### Data Protection

- Passwords are hashed before storage
- Sensitive fields excluded from API responses
- MongoDB transactions ensure data consistency
- Unique indexes prevent duplicate records

---

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables (never hardcoded secrets)
- [ ] Configure CORS with specific origins
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Implement error tracking (e.g., Sentry)
- [ ] Set up rate limiting
- [ ] Review and test all API endpoints
- [ ] Perform security audit

---

## Reporting Security Issues

If you discover a security vulnerability, please email:
**security@yourcompany.com**

Do not create public GitHub issues for security vulnerabilities.

---

## Security Best Practices

### For Developers

1. **Never commit secrets to git**
2. **Always use HTTPS in production**
3. **Validate all user inputs**
4. **Use parameterized queries**
5. **Keep dependencies updated**
6. **Follow principle of least privilege**
7. **Log security events**
8. **Implement proper error handling**

### For Deployment

1. **Use environment variables for config**
2. **Enable database backups**
3. **Set up monitoring and alerts**
4. **Use a Web Application Firewall (WAF)**
5. **Implement DDoS protection**
6. **Regular security audits**
7. **Keep servers and dependencies patched**
8. **Use secure communication protocols**

---

## Incident Response

If a security breach occurs:

1. **Immediately rotate all credentials**
2. **Investigate the breach scope**
3. **Notify affected users**
4. **Document the incident**
5. **Implement fixes to prevent recurrence**
6. **Review and update security measures**

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)