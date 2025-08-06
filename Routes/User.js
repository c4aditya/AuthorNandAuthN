const express = require("express");
const {login, signUp} = require("../controllers/User");

// const {auth , isStudent , isAdmin} = require("../middlewares/auth")

const route = express.Router();

route.post("/signup",signUp);
route.post("/login", login);

// route.get("/test" ,auth, (req,res) => {
//     res.status(200).json({
//         success:true,
//         message:"Test middle ware is working "
//     })

// })


// is end point se login krega user isStrudent se to phle ye check hoga ki ye authorized user hai ya nhi like ye student hai ya nhi 


// route.get("/isStudent", auth , isStudent , (req ,res) =>{
//     res.status(200).json({
//         success:true,
//         message:"Welcome to student dashbord "
//     })
// })

// // same hoga iss end point se bhi but ye admin check krega ki admin hai ya nhi

// route.get("/isAdmin", auth , isAdmin , (req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"Welcome my friend admin "
//     })
// })


module.exports = route;