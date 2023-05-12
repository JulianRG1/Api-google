import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
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

dash.get('/usuario', async (req,res)=>{

    if (req.cookies.ckjs) {
            

        try {
            const token = jwt.verify(req.cookies.ckjs, process.env.SECRET_KEY);

            let Ruta = "http://localhost:3000/api/user";
            let option = {
                    method:"GET"
            }
            let Datos = {};

            const result = await fetch(Ruta,option)
            .then(res => res.json())
            .then(data =>{
                Datos = data[0]
            })
            .catch(err => console.log("error en peticion: " + err));    

            res.render("dash", {
                                "nombre": token.nombre,
                                "foto": token.foto,
                                "menu": 1,
                                "datos": Datos
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

dash.post('/guardar', (req,res)=>{

    let Data = {name : req.body.name};
    let Ruta = 'http://localhost:3000/api/user';
    let Metodo = "post";


    let option = {
            method: Metodo,
            Headers: {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify(Data)
    }

    try {
        
        const result = fetch(Ruta,option)
        .then(res => res.json())
        .then(data => {
            console.log("Datos guardados");
        })
        .catch(err =>console.log('error de la api ' + err));

        res.redirect('/v1/usuario');

    } catch (error) {  }


})

dash.get('/salir', (req,res)=>{
    res.clearCookie("ckjs");
    res.redirect('/');
});


export default dash;