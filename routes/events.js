const router = require('express').Router();
const eventController = require('../controllers/eventController');
const {createValidationRules, validation} = require('../utils/eventValidations');
//const validation = require('../middleware/validate');
const isAuthenticated = require('../utils/isAuthenticated');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getSingle);
router.post('/', isAuthenticated,createValidationRules(), validation, eventController.createEvent);
router.put('/:id',isAuthenticated, createValidationRules(), validation, eventController.updateEvent);
router.delete('/:id',isAuthenticated, eventController.deleteEvent);

module.exports = router;