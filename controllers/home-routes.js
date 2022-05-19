/* --------------------------- */
/* Project  : Video Games Chat */
/* Team     : Dark Overlords   */
/* File     : home-routes.js   */
/* Date     : 05/13/2022       */
/* Modified : 05/14/2022       */
/* --------------------------- */
// Access to router module
const router = require('express').Router();
// Access to db connection
const sequelize = require('../config/connection');
// Access to Chatroom, Console, User and Message models
const { Chatroom, Console, User, Message, Favorite } = require('../models');
const withAuth = require('../utils/auth');
// Route to get all chatrooms
router.get('/', (req, res) => {
    // Access to Chatroom model to get all chatrooms
    Chatroom.findAll({
        attributes: ['id'
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
        // Render a single chatroom object into the homepage template
        const chatrooms = dbChatroomData.map(chatroom => chatroom.get({ plain: true }));
        res.render('homepage', { chatrooms, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get user session
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// Route to get sign up page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
// Route to get a chatroom by id
router.get('/chatroom/:id', (req, res) => {
    // Access to Chatroom model to get a chatroom by id
    Chatroom.findOne({
        where: { id: req.params.id}
       ,attributes: ['id'
                    ,'title'
                    ,'description'
                    ,'created_at']
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
        ,order: [[Message, 'created_at', 'ASC']]
    })
    .then(dbChatroomData => {
        if (!dbChatroomData) {
            res.status(404).json({ message: 'No chatroom found with this id' });
            return;
        }
        // Render a single chatroom object into the single chatroom template
        const chatroom = dbChatroomData.get({ plain: true });
        res.render('chatroom', { chatroom, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/favorite', withAuth, (req, res) => {
    // Access to Chatroom model to get a chatroom by id
    Favorite.findAll({
        where: {
            user_id: req.session.user_id
        }
       ,include: [
            {
                model: Chatroom
            }
        ]
    })
    .then(dbFavoriteData => {
        if (!dbFavoriteData) {
            res.status(404).json({ message: 'No chatroom found with this id' });
            return;
        }
        // Render a single chatroom object into the single chatroom template
        const favorites = dbFavoriteData.map(favorite => favorite.get({ plain: true }));

        res.render('favorite', { favorites, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Export module router
module.exports = router;