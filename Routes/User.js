const express = require("express");
const {login, signUp} = require("../controllers/User");

const route = express.Router();

route.post("/signup",signUp);
route.post("/login", login);


module.exports = route;