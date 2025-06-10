let express=require("express");
let bodyParser= require("body-parser");
let cookieParser=require("cookie-parser");
let router=require("../src/routes/routes.js");
let app=express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/",router);

module.exports=app;


