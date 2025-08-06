const mongoose = require("mongoose");
require("dotenv").config();

async function DBConnection() {

    try{
         await mongoose.connect(process.env.DB_URL)
         console.log("DB is connected sucessfully!");

    }catch(error){
           console.log("Getting error while make connection with the data base")
           console.log(error);        
    }  
      
}

module.exports = DBConnection ;

