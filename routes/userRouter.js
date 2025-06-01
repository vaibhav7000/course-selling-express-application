const express = require("express");
const router = express.Router();
const { userInputValidationSignUp, checkUsernameExistInDatabase, userInputValidationOtherRoutes, checkUserExistInDatabase } = require("../middlewares/user.js")
const { addUserInDatabase, getAllCoursesToShowUser, userPurchasedCourse } = require("../controllers/userController.js");


router.post("/signup", userInputValidationSignUp, checkUsernameExistInDatabase, addUserInDatabase);
// checkUsernameExistInDatabase -> this will be used only for the first time when data will be added to the database
router.get("/courses", userInputValidationOtherRoutes, checkUserExistInDatabase, getAllCoursesToShowUser);

// route-handler for users to purchase courses
router.post("/courses/:courseId", userInputValidationOtherRoutes, checkUserExistInDatabase, userPurchasedCourse)

module.exports = router;