const dotenv = require("dotenv");
const result = dotenv.config();

const config = {
  server: process.env.SERVER,
  database: process.env.DATABASE,
};

module.exports = config;
