const Validator = require('validatorjs');
const ObjectId = require('mongodb').ObjectId;

//Helper code for validatorjs
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

//Validate task request for post and put requests
const validateTask = (req, res, next) => {
    const validationRule = {
        taskName: 'required|string|min:4',
        taskDescription: 'string',
        eventId: 'required|string',
        organizerId: 'required|string',
        dueDate: 'required|string',
        completed: 'required|boolean'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

//Validate the Object Id if it is valid MongoDB id containing a 24 hex string
const validateObjectId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Object id is not valid.');
        //return;
    } else {
        next();
    };
}

module.exports = {
    validateTask,
    validateObjectId
};