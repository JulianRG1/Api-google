import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const LoginRoute = Router();


LoginRoute.get("/google", (req,res)=>{
   
   const id = (req.user.id);
   const name = req.user.displayName;
   const email = req.user.emails[0].value;
   const fotos =req.user.photos[0].value;

   const payload = {
      nombre : name,
      correro : email,
      foto : fotos
   }
   
   
   const token= jwt.sign(payload,process.env.SECRET_KEY,{"expiresIn": process.env.EXPIRE_TOKEN});
   console.log(token, payload);

   res.cookie("ckjs", token);

   res.redirect('/dashboard/inicio');
   /* res.render("backoffice",{nombre:" "}); */
});


 export default LoginRoute ;