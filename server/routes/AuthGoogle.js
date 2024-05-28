const express = require('express');
const router = express.Router();
const GoogleController = require('../controllers/GoogleController');

router.post('/google', GoogleController.authGoogle);

module.exports = router;
