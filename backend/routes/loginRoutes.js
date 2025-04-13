
const express = require("express");
const router = express.Router();
import { login } from "../controllers/loginController.js";

// Home page route.
router.get("/", login);

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;