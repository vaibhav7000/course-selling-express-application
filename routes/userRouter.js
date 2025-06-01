const express = require("express");
const router = express.Router();
const { userInputValidationSignUp, checkUsernameExistInDatabase } = require("../middlewares/user.js")
const { addUserInDatabase } = require("../controllers/userController.js");


router.post("/signup", userInputValidationSignUp, checkUsernameExistInDatabase, addUserInDatabase);
// checkUsernameExistInDatabase -> this will be used only for the first time when data will be added to the database


module.exports = router;