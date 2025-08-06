const express = require("express");
const app = express();
const DB = require("./config/DataBase")
const route = require("./Routes/User")
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT , () => {
    console.log(`Your Server is started on ${PORT}`);
})

// DB call
DB();



// routes

app.use("/api/vi/user",route)


