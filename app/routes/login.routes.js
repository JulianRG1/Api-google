import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const LoginRoute = Router();


LoginRoute.get("/google", (req,res)=>{
   
   const id = (req.user.id);
   const nombre = req.user.displayName;
   const email = req.user.emails[0].value;
   const foto =req.user.photos[0].value;

   const payload = {
      nombre : nombre,
      correo : email,
      foto : foto
   }
   
   
   const token = jwt.sign(payload,process.env.SECRET_KEY,{"expiresIn": process.env.EXPIRE_TOKEN});
   /* console.log(token, payload); */

   res.cookie("ckjs", token);

   res.redirect('/v1/inicio');
   /* res.render("backoffice",{nombre:" "}); */
});


 export default LoginRoute ;