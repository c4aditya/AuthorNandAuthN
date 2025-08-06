const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    FullName:{
        type:String,
         required: true,
        trim:true,
    }, 
    email:{
       type:String,
       required: true,
    },

    role:{
        type:String,
        emnu:["Admin","Student","User"]
    },

    password:{
        type:String,
         required: true
    },

    confrimPassword:{
        type:String,
        
    }
})

module.exports = mongoose.model("User" , userSchema)