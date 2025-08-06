
const User = require("../Models/user");
const bcrypt = require("bcrypt")
const Jwt  = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req ,res){
    try{
        // geting data from request ki body 
        const {FullName , email ,  password ,confrimPassword, role} = req.body;

        // check user is already exist 
   
         const isUserAllreadyExist = await User.findOne({email});

        // if user already exist then return responce  

         if(isUserAllreadyExist){
 
            return res.status(500).json({
                success:false,
                message:"User Allready exist please Logedin"
            })

         }

         // validation 
         if( !FullName || !email || !password || !confrimPassword || !role ){

            return res.status(500).json({
                success:false,
                message:"Make sure all feilds are not empty !"
            })
         }

         if(password !== confrimPassword){
            return res.status(500).json({
                success:false,
                message:" Password and confrim password must be same "
            })
         }

         // hasing the password 

         const hashedpassword = await bcrypt.hash(password , 10)

         // if all good then make entry in the data base 
         const user = await User.create({
             FullName ,
             email ,  
             password: hashedpassword ,             
             role
         })

        console.log(user)

        res.status(200).json({
            sucess:true,
            message:"Your account has been created  !"
        })

    }catch(error){

        console.log("Error occur in signup function ")
        console.log(error)

    }
}


async function login(req , res ) {

    try{

        const {email ,password , role } = req.body;

        // check email is registerd or not 

        const user = await User.findOne({email});

        if(!user){
            return res.status(500).json({
                success:false,
                message:" User is Not registerd please login first "
            })
        }

        // compare the password 

        if(await bcrypt.compare(password , user.password)){

            //if password is match then create an JWt token 
            const payloade = {
                userId : user._id,
                email: user.email,
                role: user.role,
            }

            // token creaction 

            const token = Jwt.sign(payloade ,
                process.env.Secret_Key ,{
                expiresIn:"5h"
            })

            console.log(token);
            user.token = token ;
            user.password = null;
            console.log(user)


            // creating a cookie 

            const options = {
                
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            // cookie ke ander token add kr diya 

           res.cookie("UserToken", token , options).status(200).json({
                success:true,
                user:token,
                token,
                message:"Your are sucessfully login !"
            }) 
         

        }else{
          return res.status(500).json({
            success:false,
            message:"Password does't match please make sure pasword is correct!"
          })

        }   

    }catch(error){
        console.log("Error occur in Login also check the login code !")
        console.log(error)
        res.status(500).json({
            success:false,
            message:error,
        })

    }
    
}


module.exports ={signUp , login}
