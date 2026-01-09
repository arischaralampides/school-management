import dotenv from "dotenv";
dotenv.config({ path: "./.env", override: true, quiet: true });

import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

console.log("ENV CHECK:", {
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASS_LEN: DB_PASS ? DB_PASS.length : null,
  DB_PASS_JSON: DB_PASS ? JSON.stringify(DB_PASS) : null,
});


export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

export default sequelize;
