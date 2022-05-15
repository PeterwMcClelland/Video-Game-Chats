/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : Message.js       */
/* Date     : 05/13/2022       */
/* Modified : 05/15/2022       */
/* --------------------------- */
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create Message model
class Message extends Model {}
// Define message table
Message.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define message column
    message: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,validate: {
            len: [1]
        }
    },
    // Define chatroom owner column (fk)
    user_id: {
        type:      DataTypes.INTEGER
       ,allowNull: false
       ,references: {
            model: 'user'
           ,key:   'id'
        }
    },
    // Define chatroom messaged column (fk)
    chat_id: {
        type:      DataTypes.INTEGER
       ,allowNull: false
       ,references: {
            model: 'chatroom'
           ,key: 'id'
        }
    }
},
{
    sequelize
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'message'
});
// Export class Message
module.exports = Message;