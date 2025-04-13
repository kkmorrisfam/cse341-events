const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const isAuthenticated = require("../utils/isAuthenticated");
const validate = require("../utils/userValidations");

//test route
// router.get("/check-auth", (req, res) => {
//   console.log("SESSION:", req.session);
//   console.log("COOKIE:", req.headers.cookie);
//   console.log("AUTHENTICATED:", req.isAuthenticated());
//   res.json({
//     authenticated: req.isAuthenticated(),
//     user: req.user,
//   });
// });

// user login - get the user login page
// router.get("/login", (req, res) => {
//   res.send("<h1>Login Page</h1>");
// });

// user OAuth with Google
router.get(
  "/google",
  //go to google authenticate page, get code from google
  passport.authenticate(
    "google",
    //what do we want from google?
    { scope: ["email", "profile"] }
  )
);

// Callback route from google
router.get(
  "/google/callback",
  // take code from google and get profile information
  passport.authenticate("google", {
    failureRedirect: "/login",
    // session: false,   // while false, isAuthenticated won't work correctly
  }),
  userController.googleCallBack
);

// user register - get the user register page
// router.get("/register", (req, res) => {
//   res.send("<h1>Register New User Page</h1>");
// });

// get update user page
// router.get("/update/:id", (req, res) => {
//   res.send("<h1>Update User Page by Id</h1>");
// })

// user logout route
router.get("/logout", userController.userLogout);

// #swagger.tags = ['User']
// #swagger.summary = 'Login a user'
// #swagger.description = 'Login a local user'
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           username: { type: 'string', example: 'mickeymouse' },
//           password: { type: 'string', example: 'Example123!' }
//         },
//         required: ['username', 'password']
//       }
//     }
//   }
// }
// #swagger.responses[200] = { description: 'OK. User logged in successfully.' }
// #swagger.responses[401] = { description: 'Unauthorized' }

// get all users
router.get("/", isAuthenticated, userController.getAllUsers);

// user logout route
router.get("/logout", userController.userLogout);

// get one user
router.get("/:id", isAuthenticated, userController.getUser);

router.post("/login", passport.authenticate("local"), userController.loginUser);

//route to login locally - uses passport to authenticate
router.post("/login", passport.authenticate("local"), userController.loginUser);

//route to register new user locally - also logs in user after registration

// #swagger.tags = ['User']
// #swagger.summary = 'Register a new user'
// #swagger.description = 'Creates a new user and logs them in immediately.'
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           username: { type: 'string', example: 'mickeymouse' },
//           password: { type: 'string', example: 'Example123!' },
//           firstname: { type: 'string', example: 'Mickey' },
//           lastname: { type: 'string', example: 'Mouse' },
//           email: { type: 'string', example: 'mickey@disney.com' },
//           phone: { type: 'string', example: '707-555-5555' }
//         },
//         required: ['username', 'password', 'firstname', 'lastname', 'email', 'phone']
//       }
//     }
//   }
// }
// #swagger.responses[200] = { description: 'User registered and logged in' }
// #swagger.responses[400] = { description: 'Validation or registration error' }
// #swagger.responses[500] = { description: 'Server error' }

router.post(
  "/register-user",
  validate.addLocalUserRules(),
  validate.checkValidationErrors,
  userController.registerUser
);

// route to post updates to account information and password

// #swagger.tags = ['User']
// #swagger.summary = 'Update user information'
// #swagger.description = 'Updates a user\'s personal information or password. Only fields included in the request will be updated.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   description: 'User ID',
//   required: true,
//   type: 'string'
// }
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           firstname: { type: 'string', example: 'Donald' },
//           lastname: { type: 'string', example: 'Duck' },
//           email: { type: 'string', example: 'donald@disney.com' },
//           phone: { type: 'string', example: '707-555-0000' },
//           currentPassword: { type: 'string', example: 'Example123!' },
//           newPassword: { type: 'string', example: 'BeExample123!' }
//         }
//       }
//     }
//   }
// }
// #swagger.responses[200] = { description: 'Account information updated' }
// #swagger.responses[400] = { description: 'Validation error or password change failed' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }

router.put(
  "/update-info/:id",
  validate.updateUserRules(),
  validate.checkValidationErrors,
  isAuthenticated, //comment out for testing
  userController.updateUserInfo
);

// route to delete a user, checks if user to delete is logged in first
router.delete("/delete-user/:id", isAuthenticated, userController.deleteUser);

// route to delete a user, checks if user to delete is logged in first
router.delete(
  "/delete-user/:id",
  // isAuthenticated,
  userController.deleteUser
);

module.exports = router;
