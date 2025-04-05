const router = require('express').Router();
const eventController = require('../controllers/events');
const {createValidationRules, validation} = require('../utils/eventValidations');
//const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getSingle);
router.post('/', createValidationRules(), validation, eventController.createEvent);
router.put('/:id',createValidationRules(), validation, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;