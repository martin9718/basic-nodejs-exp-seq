const express = require('express');
const router = express.Router();

const {
    registerUser,
    findUsers
} = require('../controllers/User');


router.post('/api/auth/register', (req, res) => {

    registerUser(req, res);

});

router.get('/api/users', (req, res) => {

    findUsers(req, res);

});


module.exports = router;