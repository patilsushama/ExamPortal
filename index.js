let app=require("./src/app.js");
require("dotenv").config();
let port=process.env.port || 7000;

app.listen(port,()=>{
    console.log("server started "+port);
});
