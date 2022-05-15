/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : Chatroom.js      */
/* Date     : 05/13/2022       */
/* Modified : 05/15/2022       */
/* --------------------------- */
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create Chatroom model
class Chatroom extends Model {}
// Define chatroom table
Chatroom.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define title column
    title: {
        type:      DataTypes.STRING
       ,allowNull: false
    },
    // Define chatroom description column
    description: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,validate: {
            len: [1]
        }
    },
    // Define chatroom owner column (fk)
    user_id: {
        type: DataTypes.INTEGER
       ,references: {
            model: 'user'
           ,key:   'id'
        }
    },
    // Define console column (fk)
    console_id: {
        type: DataTypes.INTEGER
       ,references: {
            model: 'console'
           ,key:   'id'
        }
    }
},
{
    sequelize
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'chatroom'
});
// Export class Chatroom
module.exports = Chatroom;