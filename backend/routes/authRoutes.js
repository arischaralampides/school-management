import express from "express";
import { loginController } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string, example: admin }
 *               password: { type: string, example: 123456 }
 *     responses:
 *       200:
 *         description: JWT token and user
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginController);

export default router;
