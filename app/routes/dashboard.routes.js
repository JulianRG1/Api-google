import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const dash= Router();


dash.get('/inicio', (req, res)=>{

        if (req.cookies.ckjs) {
            

            try {
                const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

                res.render("dash", {
                                    "nombre": token.nombre,
                                    "foto": token.foto,
                                    "menu": 0
                                    });

            } catch (error) {

                res.redirect("/")

            }
                res.render('dash')
        }else{
        res.redirect("/");
        }


/* console.log('Logueo Exitoso'); */
});

dash.get('/usuario', (req,res)=>{

    if (req.cookies.ckjs) {
            

        try {
            const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

            res.render("dash", {
                                "nombre": token.nombre,
                                "foto": token.foto,
                                "menu": 1
                                });

        } catch (error) {

            res.redirect("/")

        }
            res.render('dash')
    }else{
    res.redirect("/");
    } 
});

dash.get('/productos', (req, res)=>{

    if (req.cookies.ckjs) {
            

        try {
            const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

            res.render("dash", {
                                "nombre": token.nombre,
                                "foto": token.foto,
                                "menu": 2
                                });

        } catch (error) {

            res.redirect("/")

        }
            res.render('dash')
    }else{
    res.redirect("/");
    } 

});

dash.get('/categoria', (req,res)=>{

    if (req.cookies.ckjs) {
            

        try {
            const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

            res.render("dash", {
                                "nombre": token.nombre,
                                "foto": token.foto,
                                "menu": 3
                                });

        } catch (error) {

            res.redirect("/")

        }
            res.render('dash')
    }else{
    res.redirect("/");
    } 
})


dash.get('/salir', (req,res)=>{
    res.clearCookie("ckjs");
    res.redirect('/');
});


export default dash;