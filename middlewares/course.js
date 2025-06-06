// do input-validation on courses
const z = require("zod");
const courseSchema = z.object({
    title: z.string().trim().regex(/^[A-Za-z]+$/).min(3),
    description: z.string(),
    price: z.coerce.number(), // tries to convert the given input to number format and if conversion done => no error, else error
    imageLink: z.string().url().regex(/\.(jpg|png|jpeg|gif|svg)$/)
})


function courseValidation(req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const result = courseSchema.safeParse({
        title,
        description,
        price,
        imageLink
    })

    if(!result.success) {
        res.status(411).json({
            msg: "Invalid course inputs",
            issues: result.error.issues,
            name: result.error.name
        })
        return
    }

    next();
}


module.exports = {
    courseValidation
}