/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : User.js          */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Access to bcrypt module
const bcrypt = require('bcrypt');
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create User model
class User extends Model {
    // Method to validate access
    checkPassword(loginPwd) {
        return bcrypt.compareSync(loginPwd, this.password);
    }
};
// Define user table
User.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define username column
    username: {
        type:      DataTypes.STRING
       ,allowNull: false
    },
    // Define password column
    password: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,validate: {
            // Define minimun length to password, set in 6
            len: [6]
        }
    }
},
{
    // Methods to hash password
    hooks: {
        // Method when create a new user hash password
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // Method when update an existent user hash password if it changes
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize
   ,timestamps:      false
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'user'
});
// Export class User
module.exports = User;