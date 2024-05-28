//routes.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/save', formController.saveFormData);
router.get('/forms', formController.getAllForms);
router.get('/forms/:id', formController.getFormById); // Mettez à jour cette ligne
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

module.exports = router;
