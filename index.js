const express = require("express");
const app = express();
const { connection } = require("./db/db.js");
const adminRouter = require("./routes/adminRouter.js");
const port = 3000;

// parsing the JSON object comming in the body (if no JSON attach then it is ok will be consider body as {} / body = {}, but random thing should not be provided )

app.use(express.json());

// for connection with mongoDB cluster
connection();

// using middle-ware syntax to connect mini express application with the main application
app.use("/admin", adminRouter);

// gloabl catch middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).json({
      msg: "Something up with the server"
    })
    return
  }

  next();
})

// no-route-found middleware
app.use(function(req, res, next) {
  res.status(404).json({
    msg: "Route not found"
  })
})


app.listen(port);


