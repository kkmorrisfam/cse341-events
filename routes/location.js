const router = require('express').Router();
const locationController = require('../controllers/locationController');
const {createValidationRules, validation} = require('../utils/locationValidations');
const validation = require('../utils/locationValidations');
const  isAuthenticated  = require('../utils/isAuthenticated');

router.get('/', locationController.getAll);
router.get('/:id', locationController.getSingle);
router.post('/', createValidationRules(), validation, locationController.createLocation);
router.put('/:id',createValidationRules(), validation, locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);
router.post("/", isAuthenticated, locationController.createLocation);
router.put("/:id", isAuthenticated, locationController.updateLocation);
router.delete("/:id", isAuthenticated, locationController.deleteLocation);

module.exports = router;