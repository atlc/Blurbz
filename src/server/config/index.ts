import dotenv from "dotenv";
dotenv.config();

const mysql = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};


export default {
  mysql
}