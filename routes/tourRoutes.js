const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
} = require("../controllers/tourController.js");
const formatQuery = require("../middleware/formatQuery.js");

const router = express.Router();

// ROUTESSS
router.route("/").get(formatQuery, getAllTours).post(createTour);

router.route("/:id").get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
