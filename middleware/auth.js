const Jwt = require('jsonwebtoken');
require('dotenv').config()

const adminAuth = async (req, res,next)=>{
    try {
        const token = req.headers?.authorization || req.cookies ||   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzIzMjM0IiwidXNlclR5cGUiOjEsImlhdCI6MTY2NzgzNzI1M30.MpEA3lmw7dPHiD1qA3spd3wkWDXvYIyDAsVJ8qV428M"
     
        var decoded =  Jwt.verify(token,process.env.SECRET_KEY);
        if ( decoded.userType === 1  ||req.query.apiKey===process.env.API_KEY  ){
          return  next()
        }else{
           return res.send("you don't have access show new users");
        };
        
    } catch (error) {
        console.log("error" , error)
        return res.send({message: "internal server error" , error: error});
        
    }

}

const userAuth = (req, res,next)=>{
    const token = req.headers?.authorization || req.cookies || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzIzMjM0IiwidXNlclR5cGUiOjEsImlhdCI6MTY2NzgzNzI1M30.MpEA3lmw7dPHiD1qA3spd3wkWDXvYIyDAsVJ8qV424b";

   const  decoded = Jwt.verify(token,process.env.SECRET_KEY);
   if (decoded.userType === 2){
       next()
   }else{
       res.send("There are no user's token please provide valid token..");
   };
}

module.exports = {adminAuth , userAuth}