/* ----------------------------- */
/* Project  : Video Games Chat   */
/* Team     : Dark Overlords     */
/* File     : chatroom-routes.js */
/* Date     : 05/13/2022         */
/* Modified : 05/15/2022         */
/* ----------------------------- */
// Access to router module
const router = require('express').Router();
// Access to helpers
const withAuth = require('../../utils/auth');
// Access to Chatroom, Console, User and Message models
const { Chatroom, Console, User, Message } = require('../../models');
// Route to get all chatrooms
router.get('/', (req, res) => {
    // Access to Chatroom model to get all chatrooms
    Chatroom.findAll({
        attributes: ['id'
                    ,'title'
                    ,'description'
                    ,'created_at'
        ]
       ,order: [['created_at', 'DESC']]
        // JOIN to Chatroom and Message to get their fields
       ,include: [
            {
                model: Message
               ,attributes: ['id'
                            ,'message'
                            ,'chat_id'
                            ,'user_id'
                            ,'created_at']
               ,include: {
                    model: User
                   ,attributes: ['username']
                }
            },
            {
                model: User
               ,attributes: ['username']
            },
            {
                model: Console
               ,attributes: ['name']
            },

        ]
    })
    .then(dbChatroomData => res.json(dbChatroomData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get chatroom by id
router.get('/:id', (req, res) => {
    // Access to Chatroom model to get a chatroom by id
    Chatroom.findOne({
        where: {
            id: req.params.id
        }
       ,attributes: ['id'
                    ,'title'
                    ,'description'
                    ,'created_at'
        ]
       ,include: [
            {
                model: Message
               ,attributes: ['id'
                            ,'message'
                            ,'chat_id'
                            ,'user_id'
                            ,'created_at']
               ,include: {
                    model: User
                   ,attributes: ['username']
                }
            },
            {
                model: User
               ,attributes: ['username']
            },
            {
                model: Console
               ,attributes: ['name']
            }
        ]
    })
    .then(dbChatroomData => {
    if (!dbChatroomData) {
        res.status(404).json({ message: 'No chatroom found with this id' });
        return;
    }
    res.json(dbChatroomData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a chatroom
router.post('/', withAuth, (req, res) => {
    // Access to Chatroom model to create a chatroom
    Chatroom.create({
        title:       req.body.title
       ,description: req.body.description
       ,console_id:  req.body.console_id 
       ,user_id:     req.session.user_id
    })
    .then(dbChatroomData => res.json(dbChatroomData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to update a chatroom
router.put('/:id', withAuth, (req, res) => {
    // Access to Chatroom model to update a chatroom
    Chatroom.update(
        {
            title: req.body.title
           ,description: req.body.description
           ,console_id:  req.body.console_id 
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbChatroomData => {
    if (!dbChatroomData) {
        res.status(404).json({ message: 'No chatroom found with this id' });
        return;
    }
    res.json(dbChatroomData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to delete a chatroom
router.delete('/:id', withAuth, (req, res) => {
    // Access to Chatroom model to delete a chatroom
    Chatroom.destroy({
        where: { id: req.params.id }
    })
    .then(dbChatroomData => {
        if (!dbChatroomData) {
            res.status(404).json({ message: 'No chatroom found with this id' });
            return;
        }
        res.json(dbChatroomData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;