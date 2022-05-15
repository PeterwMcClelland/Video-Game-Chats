/* ---------------------------- */
/* Project  : Video Games Chat  */
/* Team     : Dark Overlords    */
/* File     : message-routes.js */
/* Date     : 05/13/2022        */
/* Modified : 05/14/2022        */
/* ---------------------------- */
// Access to router module
const router = require('express').Router();
// Access to helpers
const withAuth = require('../../utils/auth');
// Access to Chatroom, User and Message models
const { Message, User, Chatroom } = require('../../models');
// Route to get all messages
router.get('/', (req, res) => {
    // Access to Message model to get all messages
    Message.findAll({
        attributes: ['id'
                    ,'message'
                    ,'created_at']
       ,order: [['id', 'ASC']]
       ,include: [
            {
                model: User
               ,attributes: ['username']
            },
            {
                model: Chatroom
               ,attributes: ['title']
            }
        ]
    })
    .then(dbMessageData => res.json(dbMessageData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a message
router.post('/', withAuth, (req, res) => {
    // Access to Message model to create a message if a session exists
    if (req.session) {
        Message.create({
                message: req.body.message
               ,chat_id: req.body.chat_id
               ,user_id: req.session.user_id
        })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});
// Route to delete a chatroom
router.delete('/:id', withAuth, (req, res) => {
    // Access to Message model to delete a message
    Message.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbMessageData => {
        if (!dbMessageData) {
            res.status(404).json({ message: 'No message found with this id' });
            return;
        }
        res.json(dbMessageData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;