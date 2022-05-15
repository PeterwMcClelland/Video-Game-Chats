/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : Console.js       */
/* Date     : 05/14/2022       */
/* Modified : 05/15/2022       */
/* --------------------------- */
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create Console model
class Console extends Model {};
// Define console table
Console.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define username column
    name: {
        type:      DataTypes.STRING
       ,allowNull: false
    }
},
{
    sequelize
   ,timestamps:      false
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'console'
});
// Export class Console
module.exports = Console;