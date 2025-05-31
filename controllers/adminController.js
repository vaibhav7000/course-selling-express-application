const { Admin } = require("../db/db.js");

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

module.exports = {
    addAdminToDatabase
}