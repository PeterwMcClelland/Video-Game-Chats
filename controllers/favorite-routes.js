const router = require('express').Router();
const withAuth = require('../utils/auth');

const {Chatroom, User, Favorite} = require('../models');

router.get('/', (req, res) => {
    Favorite.findAll().then(dbFavoriteData => res.json(dbFavoriteData)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => { // Access to Favorite model to get a favorite by id
    Favorite.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'user_id', 'console_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }, {
                model: Chatroom,
                attributes: ['name']
            }
        ]
    }).then(dbFavoriteData => {
        if (!dbFavoriteData) {
            res.status(404).json({message: 'No  favorite chatroom found with this id'});
            return;
        }
        res.json(dbFavoriteData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a favorite chatroom
router.post('/', withAuth, (req, res) => { // Access to Chatroom model to create a chatroom
    Favorite.create({
       console_id: req.body.console_id, 
        user_id: req.session.user_id
    })
        .then(dbFavoriteData => res.json(dbFavoriteData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to remove a favorite chatroom 
router.delete('/:id', withAuth, (req, res) => {
    
    Favorite.destroy({
        where: { id: req.params.id }
    })
    .then(dbFavoriteData => {
        if (!dbFavoriteData) {
            res.status(404).json({ message: 'No chatroom found with this id' });
            return;
        }
        res.json(dbFavoriteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router
