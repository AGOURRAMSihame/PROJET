// routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

router.post('/submit', responseController.submitResponse);
router.get('/all', responseController.getAllResponsesWithTitles);
router.get('/all/:id', responseController.getResponseById);

module.exports = router;
