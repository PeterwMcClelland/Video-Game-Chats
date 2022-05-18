/* ------------------------------ */
/* Project  : Video Games Chat    */
/* Team     : Dark Overlords      */
/* File     : dashboard-routes.js */
/* Date     : 05/13/2022          */
/* Modified : 05/16/2022          */
/* ------------------------------ */
// Access to router module
const router = require('express').Router();
// Access to db connection
const sequelize = require('../config/connection');
// Access to helpers
const withAuth = require('../utils/auth');
// Access to Chatroom, User and Message models
const { Chatroom, Console, User, Message } = require('../models');
// Route to get all chatrooms
router.get('/', withAuth, (req, res) => {
    // Access to Chatroom model to get all chatrooms
    Chatroom.findAll({
        where: {
            user_id: req.session.user_id
        }
       ,attributes: ['id'
                    ,'title'
                    ,'description'
                    ,'created_at'
        ]
        // JOIN to Message, Console and User to get their fields
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
        // Render a single chatroom object into the dashboard template
        const chatrooms = dbChatroomData.map(chatroom => chatroom.get({ plain: true }));
        res.render('dashboard', { chatrooms, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get create chatroom page
router.get('/create', withAuth, (req, res) => {
    Console.findAll({
       attributes: ['id'
                   ,'name'
        ]
    })
    .then(dbChatroomData => {
        // Render a console object into the create template
        const consoles = dbChatroomData.map(console => console.get({ plain: true }));
        res.render('create-chatroom', { consoles, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get chatroom by id to edit
router.get('/edit/:id', withAuth, (req, res) => {
    // Access to Chatroom model to get a chatrooms by id
    Chatroom.findOne({
        where: { id: req.params.id}
       ,attributes: ['id'
                    ,'title'
                    ,'description'
                    ,'created_at'
        ]
        // JOIN to Message, Console and User to get their fields
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
               ,attributes: ['id'
                            ,'name']
            }
        ]
    })
    .then(dbChatroomData => {
        if (!dbChatroomData) {
            res.status(404).json({ message: 'No chatroom found with this id' });
            return;
        }
        // Render a single chatroom object into the edit chatroom template
        const chatroom = dbChatroomData.get({ plain: true });
        res.render('edit-chatroom', { chatroom, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;