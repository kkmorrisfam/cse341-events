const router = require("express").Router();
const vendorController = require('../controllers/vendorController');
const {createValidationRules, validation} = require('../utils/vendorValidations');

router.get('/', 
    vendorController.getAllVendors);
router.get('/:id', 
    vendorController.getOneVendor);
router.post('/', 
    createValidationRules(), validation,
    vendorController.createVendor);
router.put('/:id', 
    createValidationRules(), validation,
    vendorController.updateVendor);
router.delete('/:id', 
    vendorController.deleteVendor);


module.exports = router;