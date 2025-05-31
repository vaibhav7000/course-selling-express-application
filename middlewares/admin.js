// using older way of exporting and importing variables in function
const z = require("zod");
const { Admin } = require("../db/db.js")
const adminSchema = z.object({
    username: z.string(),
    password: z.string()
})

function adminInputValidation(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const result = adminSchema.safeParse({
        username, password
    })

    if(!result.success) {
        res.status(411).json({
            msg: "Invalid inputs send by the admin",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    next()
}

async function checkUsernameAlreadyExist(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // making call to database
    try {
        const response = await Admin.findOne({
            username
        }) // our database will have unqiue username for each admin present inside collection

        if(response) {
            // username already exist
            res.status(411).json({
                msg: "Admin with this username exists. Please try different one"
            })

            return;
        }
        next();
    } catch(err) {
        console.log("checkUsernameAlreadyExist function");
        console.log(err);

        throw err;
    }
}


// syntax of exporting the function / variables 

module.exports = {
    adminInputValidation,
    checkUsernameAlreadyExist
}