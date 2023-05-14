const { Client } = require("pg");
// const dotenv = require("dotenv");

// dotenv.config();

const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "vreeti",
  database: "test",
});

client.on("connect", () => {
  console.log("Database connected sucessfully!");
});

client.on("end", () => {
  console.log("Connection end");
});

module.exports = client;
