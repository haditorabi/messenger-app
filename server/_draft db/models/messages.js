const Sequelize = require("sequelize");
const db = require("../db");

const Messages = db.define("messages", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId : {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // this feature can be apply in future
  // replyTo : {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  // }
});

module.exports = Messages;
