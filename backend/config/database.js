import { Sequelize } from "sequelize";

const DB_NAME = "school_management";
const DB_USER = "user8";
const DB_PASS = "COd1ngF@";
const DB_HOST = "localhost";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});


export default sequelize;
