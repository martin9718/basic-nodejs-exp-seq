const express = require('express');
const router = express.Router();

const {login, verifyToken} = require('../controllers/auth');


router.post('/api/auth/login', async (req, res) => {

    await login(req, res);

});

router.get('/api/auth/verifyToken', async (req, res) => {

    await verifyToken(req, res);

});
module.exports = router;