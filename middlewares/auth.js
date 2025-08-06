const jwt = require("jsonwebtoken")
require("dotenv").config();


async function auth(req , res , next){

    try{
   // extrect jwt toekn 
   // there are three way for extract the token 
   const token = req.body.token || req.cookie.token || req.header.token 

   if(!token){
    return res.status(500).json({
        sucess:false,
        message:"Token missing"
    })
   }

   // varify the toekn 

   try{

    const decode_token = jwt.verify(token , process.env.Secret_Key);
    console.log(decode_token);
    req.user = decode_token
    

   }catch(error){

    return res.status(401).json({
        success:false,
        message:"Token is invalid "
    })

   }
   next();
         
    }catch(error){
             console.log(error)

      return res.status(401).json({
        sucess:false,
        message:"something wnr wrong while in authentication "
      })

 

    }
}

