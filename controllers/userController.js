const { User } = require("../db/db.js");

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


module.exports = {
    addUserInDatabase,
}