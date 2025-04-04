const router = require("express").Router();
const userRoutes = require("./userRoutes");

//route for "home page" placeholder
router.get("/", (req, res) => {
  res.send("<h1>Events R Us</h1>");
});
router.use('/events', require('./events'));


//router for user login/authentication
router.use("/user", userRoutes);

router.use("/tasks", require("./tasks"));


module.exports = router;