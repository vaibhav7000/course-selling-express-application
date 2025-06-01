const z = require("zod");
const { User } = require("../db/db.js");
const userSchema = z.object({
    username: z.string().trim().min(3).regex(/^[A-Za-z0-9_]+$/), // regex that represent string should only contains alphabets, numbers and _
    password: z.string().trim().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
})


function userInputValidationSignUp(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const result = userSchema.safeParse({
        username, password
    })

    if(!result.success) {
        res.status(411).json({
            msg: "Invalid username or password",
            issues: result.error.issues
        })
        return
    }

    next();
}

// making the entries in user and admin collection unique by the username
async function checkUsernameExistInDatabase(req, res, next) {
    // this function will be only called when user hits the signup route hence it will send the credentials in body only
    const username = req.body.username;

    try {
        const dbUser = await User.findOne({
            username
        })

        if(dbUser) {
            res.status(411).json({
                msg: "user with username already exist in db",
            })
            return
        }

        next();


    } catch(err) {
        throw err;
    }
}

function userInputValidationOtherRoutes(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    const result = userSchema.safeParse({
        username,
        password
    })

    if(!result.success) {
        res.status(411).json({
            msg: "Invalid format of username or password",
            issues: result.error.issues
        })

        return;
    }
    next();
}

async function checkUserExistInDatabase(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    try {
        const response = await User.findOne({
            username, password
        })

        if(!response) {
            res.status(403).json({
                msg: "Either the username eor password is incorrect ",
            })
            return
        }

        req.user = response; // attaching the user information from the db
        next();
    } catch (error) {
        throw error;
    }
}



// when we require this in other files, nodeJS provides us the value of the exports in this case it will be object 
module.exports = {
    userInputValidationSignUp,
    checkUsernameExistInDatabase,
    userInputValidationOtherRoutes,
    checkUserExistInDatabase
}