const express = require('express');
const router = express.Router();

const {registerUser, findUsers, updateUser, desactiveUser, getUserRoles} = require('../controllers/user');


router.post('/api/auth/register', async (req, res) => {

    await registerUser(req, res);

});

router.get('/api/auth/users', async (req, res) => {

    await findUsers(req, res);

});

router.get('/api/auth/getUserRoles', async (req, res) => {

    await getUserRoles(req, res);

});

router.post('/api/auth/updateUser/:id', async (req, res) => {

    await updateUser(req, res);

});

router.get('/api/auth/desactiveUser/:id', async (req, res) => {

    await desactiveUser(req, res);

});

module.exports = router;