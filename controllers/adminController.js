const { Admin, Course } = require("../db/db.js");

async function addAdminToDatabase(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const finalUser = new Admin({
        username, password
    })

    try {
        const result = await finalUser.save();
        console.log("Admin added to the database")
        console.log(result);

        res.status(200).json({
            message: "Admin created successfully"
        })
    } catch(err) {
        // will be thrown inside the global catch middleware
        throw err;
    }
}

async function addAdminCourseToDatabase(req, res, next) {
    // finally admin exist and courses details are also correct
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const user = req.body.user; // this we get from the mongoDB when checking user exists in the database

    const course = new Course({
        title,
        description,
        price,
        imageLink,
        owner: user._id, //linking of owners with courses are done
    })

    try {
        const response = await course.save();
        // response will be the added course with _id property
        res.status(200).json({
            response
        })
    } catch(err) {
        throw err;
    }
}

async function provideAllCourses(req, res, next) {
    const { user } = req.body // destructing the object and fetching value of the user key

    try {
        // returns an array off all the courses, if no course found then return empty array
        const allCourses = await Course.find({
            owner: user._id
        })

        res.status(200).json({
            allCourses
        })

        
    } catch(err) {
        throw err;
    }
}

module.exports = {
    addAdminToDatabase,
    addAdminCourseToDatabase,
    provideAllCourses
}