const {check, validationResult} = require('express-validator');

const createValidationRules = () =>{
    return [
        check("vendorName", "Vendor name is required").trim().notEmpty(),
        check("vendorDescription").optional({values: "falsy"}),
        check("vendorLocation", "Vendor location is required min 6 and max 15 characters ").trim().isLength({min: 6,max: 15 }),
        check("vendorEmail", 'Vendor email is required').trim().notEmpty().isEmail(),
        check("vendorPhone", 'Vendor phone is required').trim().notEmpty(),
        check("vendorWebsite", 'Vendor website is required').trim().notEmpty(),
        check("vendorSocialMedia", 'Vendor social media is required').trim().notEmpty()
    ];
}

const validation = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation NOT approved");
        return res.status(400).json({errors: errors.array()});
    }
    console.log("Validation approved");
    next();
};
module.exports = {
    createValidationRules,
    validation
}