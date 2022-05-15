/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : connection.js    */
/* Date     : 05/13/2022       */
/* Modified : 05/13/2022       */
/* --------------------------- */
// Import the Sequelize constructor to use
const Sequelize = require('sequelize');
// Import .env file to get credentials to access database
require('dotenv').config();
// Create connection to database, get credentials from .env file
let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost'
       ,dialect: 'mysql'
       ,port: 3306
    });
};
// Export module sequelize
module.exports = sequelize;