import express from "express";
import dotenv from "dotenv";
import  LoginRoute  from "./routes/login.routes.js";
import  passport from "passport";
import "./middleware/google.js";
import ejs from "ejs";
import path from "path";
import * as url from 'url';
import Routes from "./routes/backoffice.routes.js";
import Route from "./routes/home.routes.js";
import dash from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";

const app = express();

//SETTINGS
dotenv.config();

//MIDDLEWARES
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use("/auth",passport.authenticate('auth-google',{
    scope:["https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"],
    session:false

}),LoginRoute);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 6999);

//Plantilla ejs
app.set("view engine", "ejs");

//direccion de view para ejs 
app.set("views", path.join(__dirname, "views"));

app.use('/', Routes);
app.use('/',Route);
app.use('/service',Route);
app.use('/v1',dash);

app.use(express.static(__dirname + '../public'));

/* app.get("/",(req,res)=>{
    res.send("Hi Welcome")
}); */



export default app;
