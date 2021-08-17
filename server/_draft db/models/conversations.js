const { Op } = require("sequelize");
const db = require("../db");

const Conversations = db.define("conversations", {  
  // it could be something like groupName ot roomName for oneToOne chats it could be null
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// find conversation with name
Conversations.findConversationByName = async function (convName) {
  const conversation = await Conversations.findOne({
    where: {
      name: {
        [Op.like]: `%${convName}%`
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversations;
