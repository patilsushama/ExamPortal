let mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"advancejava"

});

db.connect((err)=>{
    if(err)
    {
        // throw err;
        console.log("database is not connected");
    }
    else{
        console.log("Database is connected");

    }
});
module.exports=db;