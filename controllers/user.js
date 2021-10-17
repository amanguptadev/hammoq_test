const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


// Get user
exports.getUser = async (req, res, next) => {
    try {
        res
        .status(200)
        .json({
          success: true,
          user: req.user,
        });
    } catch (err) {
      next(err);
    }
  };