const router = require("express").Router();
const vendorController = require('../controllers/vendorController');
const isAuthenticated = require("../utils/isAuthenticated");
const {createValidationRules, validation} = require('../utils/vendorValidation');

router.get('/', 
    vendorController.getAllVendors);
router.get('/:id', 
    vendorController.getOneVendor);''
router.post('/', 
    isAuthenticated,
    createValidationRules(), validation,
    vendorController.createVendor);
router.put('/:id', 
    isAuthenticated,
    createValidationRules(), validation,
    vendorController.updateVendor);
router.delete('/:id', 
    isAuthenticated,
    vendorController.deleteVendor);

module.exports = router;