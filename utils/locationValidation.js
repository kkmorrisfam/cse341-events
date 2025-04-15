const { check, validationResult } = require('express-validator');

const createValidationRules = () => {
  return [
    check('locationName', 'Location name is required').trim().notEmpty().isLength({ min: 2, max: 50 }),
    check('latitude', 'Latitude is required').trim().notEmpty().isNumeric().custom(value => value >= -90 && value <= 90),
    check('longitude', 'Longitude is required').trim().notEmpty().isNumeric().custom(value => value >= -180 && value <= 180),
    check('address', 'Address is required').trim().notEmpty().isLength({ min: 2, max: 100 }),
    check('city', 'City is required').trim().notEmpty().isLength({ min: 2, max: 50 }),
    check('country', 'Country is required').trim().notEmpty().isLength({ min: 2, max: 50 }),
  ];
};

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }
  next();
};

module.exports = {
    createValidationRules,
    validation
}
