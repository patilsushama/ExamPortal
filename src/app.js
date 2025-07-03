let express=require("express");
let bodyParser= require("body-parser");
const session = require("express-session");

let cookieParser=require("cookie-parser");
let router=require("../src/routes/routes.js");
let app=express();
app.set("view engine", "ejs");
require("dotenv").config();

app.use(express.static("public"));
const db=require("./config/db.js");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET ||'fallbacksecret',
  resave: false,
  saveUninitialized: false
}));

app.use("/",router);
module.exports=app;




