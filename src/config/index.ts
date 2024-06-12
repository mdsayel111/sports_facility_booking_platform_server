// setup dotenv
import dotenv from "dotenv"
dotenv.config()

// get all config from .env
const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL
};

export default config;
