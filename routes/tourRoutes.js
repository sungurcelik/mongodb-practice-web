const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController.js");
const formatQuery = require("../middleware/formatQuery.js");

const router = express.Router();

// ROUTESSS

router.route("/top-tours").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);

router.route("/monthly-plan/:year").get(getMonthlyPlan);

router.route("/").get(formatQuery, getAllTours).post(createTour);

router.route("/:id").get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
