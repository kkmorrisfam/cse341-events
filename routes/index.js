const router = require("express").Router();
const userRoutes = require("./userRoutes");

//route for "home page" placeholder
router.get("/", (req, res) => {
  res.send("<h1>Events R Us</h1>");
});

router.use('/', require('./swagger'));
router.use('/events', require('./events'));

//router for user login/authentication
router.use("/user", userRoutes);
router.use("/tasks", require("./tasks"));

//router for location routes
router.use("/location", require("./location"));

module.exports = router;