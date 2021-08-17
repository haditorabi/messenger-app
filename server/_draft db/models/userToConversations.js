const Sequelize = require("sequelize");
const db = require("../db");

const userToConversations = db.define("userToConversations", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  postingAllowed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: true
  },
});

module.exports = userToConversations;
