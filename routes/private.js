const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const {getUser}  = require("../controllers/user");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateRoute);
router.route("/user").get(protect, getUser);

module.exports = router;
