const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:212121@localhost:5432/messenger", {
  logging: false,
  dialect: "postgres"
});

module.exports = db;
