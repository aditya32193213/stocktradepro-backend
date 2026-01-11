import express from "express";
import { registerUser, loginUser } from "../../controllers/index.js";
import { registerValidation, loginValidation } from "../../validations/index.js";
import { authLimiter } from "../../middleware/index.js";
import { validate } from "../../middleware/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - pan
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               pan:
 *                 type: string
 *                 example: ABCDE1234F
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post("/register", registerValidation, validate, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and receive JWT token
 *     tags: [Auth]
 *     security:  []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authLimiter, loginValidation, validate, loginUser);

export default router;
