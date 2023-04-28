import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const dash= Router();


dash.get('/inicio', (req, res)=>{

        if (req.cookies.ckjs) {
            

            try {
                const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

                res.render("dash", {"nombre": token.nombre,
                                    "foto": token.foto
                                    });

            } catch (error) {

                res.redirect("/")

            }

        }else{
        res.redirect("/");
        }


/* console.log('Logueo Exitoso'); */
});

dash.get('/salir', (req,res)=>{
    res.clearCookie("ckjs");
    res.redirect('/');
})
export default dash;