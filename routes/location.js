const router = require("express").Router();
const locationController = require("../controllers/locationController");
const {
  createValidationRules,
  validation,
} = require("../utils/locationValidation");
//const validation = require('../utils/locationValidation');
const isAuthenticated = require("../utils/isAuthenticated");

router.get("/", locationController.getAll);
router.get("/:id", locationController.getSingle);
router.post(
  "/",
  isAuthenticated,
  createValidationRules(),
  validation,
  locationController.createLocation
);
router.put(
  "/:id",
  isAuthenticated,
  createValidationRules(),
  validation,
  locationController.updateLocation
);
router.delete("/:id", isAuthenticated, locationController.deleteLocation);

module.exports = router;
