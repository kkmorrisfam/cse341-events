const {check, validationResult} = require('express-validator');

const createValidationRules = () =>{
    return [
        check("vendorName", "Vendor name is required").trim().notEmpty(),
        check("vendorCategory").trim().notEmpty().isAlphanumeric().withMessage("Vendor category is required and must be alphanumeric"),
        check("contactName", 'Vendor contact name is required').trim().notEmpty().isAlphanumeric().withMessage("Vendor contact name is required and must be alphanumeric"),
        check("contactEmail", 'Vendor email is required').trim().notEmpty().isEmail(),
        check("contactPhone", 'Vendor phone is required').trim().isMobilePhone("any").withMessage("Vendor phone is required and must be a valid phone number"),
        check("website", 'Vendor website is required').trim().notEmpty().isURL().withMessage("Vendor website is required and must be a valid URL"),
        check("rating", 'Vendor rating is required').trim().notEmpty().isNumeric().withMessage("Vendor rating is required and must be a number")
    ];
}

const validation = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation failed");
        return res.status(400).json({errors: errors.array()});
    }
    console.log("Validation success");
    next();
};
module.exports = {
    createValidationRules,
    validation
}