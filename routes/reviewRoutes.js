const express = require("express");

const router = express.Router();

// ROUTESSS
router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {});

router
  .route("/:id")
  .get(() => {})
  .delete(() => {})
  .patch(() => {});

module.exports = router;
