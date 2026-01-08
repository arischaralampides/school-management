import { Sequelize } from "sequelize";
import "dotenv/config";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

/* 🔍 TEMP DEBUG — ADD THIS BLOCK */
console.log("ENV CHECK:", {
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASS_LEN: DB_PASS ? DB_PASS.length : null,
  DB_PASS_JSON: DB_PASS ? JSON.stringify(DB_PASS) : null,
});
/* 🔍 END TEMP DEBUG */

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

export default sequelize;
