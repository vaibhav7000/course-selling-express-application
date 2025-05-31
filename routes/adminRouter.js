const express = require("express");
const z = require("zod");
const router = express.Router(); // creating the mini-application and then integrating with the main application using app.use() -> middleware by either providing the different routes inside the use or simply no route then the route passed in the main mini application will be used

// when using this In the main application we sort of combine



















// Use of the Routers in express is to kind of create mini express application and then integrating with the main application. Kind of creating different route-handler for different user in different files and hence making the code cleaner