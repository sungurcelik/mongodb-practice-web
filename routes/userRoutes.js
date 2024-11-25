const express = require("express");
const { signUp, login, logout } = require("../controllers/authController.js");

const router = express.Router();

// ROUTESSS
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
