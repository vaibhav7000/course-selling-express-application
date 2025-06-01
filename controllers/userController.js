const { User, Course, Enrollment } = require("../db/db.js");

async function addUserInDatabase(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const finalUser = new User({
            username, password
        })

        // saving the user in user collection and response will be the saved user
        const response = await finalUser.save();

        res.status(200).json({
            response
        })

    } catch(err) {
        throw err;
    }
}

async function getAllCoursesToShowUser(req, res, next) {
    // return all the courses to the user after doing validation of user exist in the database
    try {
        // if no filter is specified to "find method" than it will return all the documents present inside the collection
        const allCourses = await Course.find() // or use find({}) both will return all the documents present inside the Course collection

        res.status(200).json({
            allCourses
        })
    } catch(err) {
        throw err;
    }
}

// When dealing with many-to-many relationship between different collections / tables we define a third collection that represents the relationship (that third collection is called Join collection or pivot collection)
async function userPurchasedCourse(req, res,next) {
    const courseId = req.params.courseId;
    const user = req.user;
    // finding the course with the courseID
    try {
        // findById(id) is equivalent to findOne({ _id: id }).
        const response = await Course.findById(courseId);

        if(!response) {
            res.status(411).json({
                msg: "No course exist with this courseID"
            })
            return
        }
        const enrollmentResult = new Enrollment({
            user: user._id,
            course: courseId,
        })

        try {
            // adding the relationship value in the enrollment
            const addCourseToUser = await enrollmentResult.save();

            res.status(200).json({
                msg: "Course successfully purchased",
                purchasedId: addCourseToUser._id,
                coursePurchased: response
            })
        } catch(err) {
            next(err); // I want the error to be reached to the express and then express calls the global-catch middle-ware function
            // throw err -> throws the error where this async function is called and hence does not reaches to the express and express may have implemented if there is an error with the async code print and stops error
        }

        
    } catch(err) {
        next(err);
    }
}


module.exports = {
    addUserInDatabase,
    getAllCoursesToShowUser,
    userPurchasedCourse
}