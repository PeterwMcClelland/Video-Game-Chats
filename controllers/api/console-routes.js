/* ---------------------------- */
/* Project  : Video Games Chat  */
/* Team     : Dark Overlords    */
/* File     : console-routes.js */
/* Date     : 05/14/2022        */
/* Modified : 05/15/2022        */
/* ---------------------------- */
// Access to router module
const router = require('express').Router();
// Access to Chatroom, Console and User models
const { User, Console, Chatroom } = require('../../models');
// Route to get all consoles
router.get('/', (req, res) => {
    // Access to Console model to get all consoles
    Console.findAll({attributes: ['id','name']})
    .then(dbConsoleData => res.json(dbConsoleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to get console by id
router.get('/:id', (req, res) => {
    // Access to Console model to get a console by id
    Console.findOne({
       where: { id: req.params.id }
        // JOIN to Chatroom to get their fields
       ,include: [{
            model: Chatroom
           ,attributes: ['id'
                        ,'title'
                        ,'description'
                        ,'created_at']
        }
    ]
    })
    .then(dbConsoleData => {
        if (!dbConsoleData) {
            res.status(404).json({ message: 'No console found with this id' });
            return;
        }
        res.json(dbConsoleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to add a console
router.post('/', (req, res) => {
    // Access to Console model to create a console
    Console.create({
        name: req.body.name
    })
    .then(dbConsoleData => {
        req.session.save(() => {
            // Declare session variables
            req.session.console_id  = dbConsoleData.id;
            req.session.name = dbConsoleData.name;
            req.session.loggedIn = true;
            res.json(dbConsoleData);
        });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
// Route to update a console
router.put('/:id', (req, res) => {
    // Access to Console model to update a console
    Console.update(req.body, {
       where: { id: req.params.id }
    })
    .then(dbConsoleData => {
        if (!dbConsoleData[0]) {
            res.status(404).json({ message: 'No console found with this id' });
            return;
        }
        res.json(dbConsoleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Route to delete a console
router.delete('/:id', (req, res) => {
    // Access to Console model to delete a console
    Console.destroy({
        where: { id: req.params.id }
    })
    .then(dbConsoleData => {
        if (!dbConsoleData) {
            res.status(404).json({ message: 'No console found with this id' });
            return;
        }
        res.json(dbConsoleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;