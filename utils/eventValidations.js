const {check, validationResult} = require('express-validator');
//event {_id, 
// eventName, 
// eventDescription, 
// date, 
// location,
//  eventStart,
//   eventEnd,
//    organizerId, 
//    vendorId}

const createValidationRules = () =>{
    return [
        check("eventName", "Event name is required").trim().notEmpty(),
        check("eventDescriotion").optional({values: "falsy"}),
        check("date", 'Date is required with "YYYY, Month, DD" format').trim().notEmpty().matches(/^\d{4},\s(January|February|March|April|May|June|July|August|September|October|November|December),\s\d{1,2}$/),
        check("location", "Location is required min 6 and max 15 characters ").trim().isLength({min: 6,max: 15 }),
        check("eventStart", 'Event start time is required with "HH:MM AM/PM" format').trim().notEmpty().matches(/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i),
        check("eventEnd", 'Event end time is required with "HH:MM AM/PM" format').trim().notEmpty().matches(/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i),
        check("organizerId", 'Organizer is required').trim().notEmpty(),
        check("vendorId", 'Vendor is required').trim().notEmpty()
    ];
};

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