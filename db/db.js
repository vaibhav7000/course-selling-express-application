// file that will contain logics for database connection + schema and models
const mongoose = require("mongoose");
const connection_url = "mongodb+srv://vc160222:x8TOIKGv5jVJDlXV@weekthreepoint2database.tjr09d4.mongodb.net/course_selling_backend_db"; // secret  // this will create noSQL database in the cluster (whose url is provided) with name course_selling_backend_db if not exists and all the operations will be done on this

async function connection() {
    try {
        await mongoose.connect(connection_url); // asynchronous task therefore delegated to the other thread
        // if we does not apply "await" then think we does not provide the callback function to be called after success hence main thread does not know that to do
        console.log("connection successfull with the databse")
    } catch(err) {
        console.log("error occures while connecting to the database");
        process.exit(1) // stoping the server with code 1
    }
}

// admin schema for mongoose 
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})

// admin model
const Admin = new mongoose.model('Admin', AdminSchema) // 'Admin' represent name of the model + mongoose will convert this into lowercase + plural and hence represents the "collection name" for this data


// user schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

// user model
const User = new mongoose.model('User', UserSchema);

// course schema
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin'
    }
})

// course model
const Course = new mongoose.model('Course', CourseSchema);

module.exports = {
    // when exporting multiple variables / function use this syntax
    connection,
    Admin,
    User,
    Course
}


// at the end mongoose provides us the apis / functionalities to store the data in the collection in well structured format (schema based if something is up with the schema than it will throw error and does not store the data in db)

// MongoDB only provides us to store data, but mongoose store the data in noSQL db in well structured format.(converting to lowercase and plural is all done by the mongoose)

// In zod if we want to test something custom on the input we will refine() -> takes the callback function that will executed on the provided value passed through the safeParse or parse method available on schemas

// when we have many to many relationship betwen collection / tables we define a third collection and hence store the relationship in the third collection (see with user and course)

// A single user can have many courses and a single course can be takes by my users (many to many relationship)