const { check, validationResult } = require("express-validator");
//check will use body, param and query to validate

const validate = {};

validate.addLocalUserRules = () => {
  //username, firstname, lastname, email, phone
  return [
    check("username")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a first name."),
    check("firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a first name"),
    check("lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a last name"),
    check("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email."), //on error this message is sent
    check("phone")
      .trim()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 9 })
      .withMessage("Password must be at least 9 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&#^()+={}[\]\\|;:'",.<>/~`_-]/)
      .withMessage("Password must contain at least one special character"),
  ];
};

validate.updateUserRules = () => {
  //username, firstname, lastname, phone, email
  return [
    // firstname is optional on update
    check("userName").optional().trim().escape().notEmpty(),
    check("firstName")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("First name can't be empty if updating."), //on error this message is sent
    //lastname is optional on update
    check("lastName")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("Last name can't be empty if updating."), //on error this message is sent
    // valid email is required
    check("email")
      .optional()
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email."), //on error this message is sent
    check("phone")
      .optional()
      .trim()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("currentPassword")
      .optional()
      .notEmpty()
      .withMessage("Current password is required to update your password"),
    check("newPassword")
      .optional()
      .isLength({ min: 9 })
      .withMessage("Password must be at least 9 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&#^()+={}[\]\\|;:'\",.<>/~`_-]/)
      .withMessage("Password must contain at least one special character"),
  ];
};

validate.checkValidationErrors = (req, res, next) => {
  //   console.log("inside validate");
  const errors = validationResult(req);
  //if errors is not empty
  if (!errors.isEmpty()) {
    //status 400 = Bad Request
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
