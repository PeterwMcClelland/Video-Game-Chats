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
const { Chatroom, Console, User } = require('../models');
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
        ,order: [['created_at', 'DESC']]
        // JOIN to Message, Console and User to get their fields
       ,include: [
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

        Console.findAll({
            attributes: ['id'
                        ,'name'
             ]
         })
         .then(dbConsoleData => {
            User.findOne({
                where: {id: req.session.user_id}
            })
                .then(dbUserData => {
                    // Render a chatroom object into the dashboard template
                    const user = dbUserData.get({ plain: true });
                    const consoles = dbConsoleData.map(console => console.get({ plain: true }));
                    const chatrooms = dbChatroomData.map(chatroom => chatroom.get({ plain: true }));
                    res.render('dashboard', { chatrooms, consoles, user, loggedIn: true });
            })
        })
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
        Console.findAll({
            attributes: ['id'
                        ,'name'
             ]
         })
         .then(dbConsoleData => {
             // Render a console object into the create template
             const consoles = dbConsoleData.map(console => console.get({ plain: true }));
             const chatroom = dbChatroomData.get({ plain: true });
             res.render('edit-chatroom', { chatroom, consoles, loggedIn: true });
         })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;