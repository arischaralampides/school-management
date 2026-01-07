import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { findByUsername, createUser, countUsers } from "../repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

export const login = async ({ username, password }) => {
  const user = await findByUsername(username);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user: { id: user.id, username: user.username, role: user.role } };
};

// Seeds an admin user if none exists (simple, but meets requirement)
export const seedAdminIfNeeded = async () => {
  const shouldSeed = (process.env.SEED_ADMIN || "false").toLowerCase() === "true";
  if (!shouldSeed) return;

  const users = await countUsers();
  if (users > 0) return;

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "123456";
  const role = process.env.ADMIN_ROLE || "ADMIN";

  const password_hash = await bcrypt.hash(password, 10);
  await createUser({ username, password_hash, role });

  console.log(`[seed] Admin user created: ${username}/${password} role=${role}`);
};
