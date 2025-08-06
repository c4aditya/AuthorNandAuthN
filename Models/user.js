const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstName:{
        type:String,
        requried:true,
        trim:true,
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
       type:String,
       required:true,
    },

    password:{
        type:String,
        required:true
    },

    confrimPassword:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User" , userSchema)