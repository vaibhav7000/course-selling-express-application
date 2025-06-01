const { User, Course } = require("../db/db.js");

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


module.exports = {
    addUserInDatabase,
    getAllCoursesToShowUser
}