const Conversations = require("./conversations");
const UserToConversations = require("./userConversations");
const Users = require("./users");
const Messages = require("./messages");


Users.hasMany(UserToConversations);
UserToConversations.belongsTo(Users);

Conversations.hasMany(UserToConversations);
UserToConversations.belongsTo(Conversations);

Conversations.hasMany(Messages);
Messages.belongsTo(Conversations);

Users.hasMany(Messages);
Messages.belongsTo(Users);

module.exports = {
  Users,
  Conversations,
  UserToConversations,
  Messages
};
