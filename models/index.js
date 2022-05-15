/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : models/index.js  */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Access to User model
const User = require('./User');
// Access to Console model
const Console = require('./Console');
// Access to Chatroom model
const Chatroom = require('./Chatroom');
// Access to Comment model
const Message = require('./Message');
// Create tables associations
User.hasMany(Chatroom, {
    foreignKey: 'user_id'
});
Chatroom.belongsTo(User, {
    foreignKey: 'user_id'
});
Console.hasMany(Chatroom, {
    foreignKey: 'console_id'
});
Chatroom.belongsTo(Console, {
    foreignKey: 'console_id'
});
Message.belongsTo(User, {
    foreignKey: 'user_id'
});
Message.belongsTo(Chatroom, {
    foreignKey: 'chat_id'
});
User.hasMany(Message, {
    foreignKey: 'user_id'
});
Chatroom.hasMany(Message, {
    foreignKey: 'chat_id'
});
// Export models User, Chatroom and Message
module.exports = { User, Chatroom, Console, Message };