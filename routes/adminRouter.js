const express = require("express");
const { adminInputValidation, checkUsernameAlreadyExist, checkAdminExistInDatabase } = require("../middlewares/admin.js") // no need to specify the file extension or you can. In both does not throw any error
const { addAdminToDatabase, addAdminCourseToDatabase } = require("../controllers/adminController.js");
const { courseValidation } = require("../middlewares/course.js");


const router = express.Router(); // creating the mini-application and then integrating with the main application using app.use() -> (middleware syntax )by either providing the different routes inside the use or simply no route then the route passed in the main mini application will be used

// the main logic will be written inside the adminController.js
router.post("/signup", adminInputValidation, checkUsernameAlreadyExist, addAdminToDatabase);

router.post("/courses", checkAdminExistInDatabase, courseValidation, addAdminCourseToDatabase)


// provide this router to app.use syntax
module.exports = router;




















// Use of the Routers in express is to kind of create mini express application and then integrating with the main application. Kind of creating different route-handler for different user in different files and hence making the code cleaner