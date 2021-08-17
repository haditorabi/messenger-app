const Conversations = require("./conversations");
const UserToConversations = require("./userConversations");
const Users = require("./users");
const Messages = require("./messages");

// associations

// Users.hasMany(Conversations);
// Messages.belongsTo(Conversations);
// Conversations.hasMany(Messages);

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
