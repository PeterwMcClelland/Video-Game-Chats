/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : api/index.js     */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Access to router module
const router = require('express').Router();
// Access to user routes
const userRoutes = require('./user-routes.js');
// Access to post routes
const chatroomRoutes = require('./chatroom-routes');
// Access to comment routes
const messageRoutes = require('./message-routes');
// Access to console routes
const consoleRoutes = require('./console-routes');
// Open user routes
router.use('/users', userRoutes);
// Open chatroom routes
router.use('/chatrooms', chatroomRoutes);
// Open comment routes
router.use('/messages', messageRoutes);
// Open console routes
router.use('/consoles', consoleRoutes);
// Export module router
module.exports = router;