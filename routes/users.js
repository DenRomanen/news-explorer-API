const router = require('express').Router();

const { getMe } = require('../controllers/users');

router.get('/users/me', getMe);

module.exports = router;
