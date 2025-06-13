//admin login
let db = require("../config/db.js");

exports.getAdminByCredentials = (admin_name, admin_pass, callback) => {
  const query = "SELECT * FROM admin WHERE aname = ? AND apassword = ?";
  db.query(query, [admin_name, admin_pass], (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(null, null);
    }
  });
};


//admin dashboard info=admin
exports.getAdminByName = (name, callback) => {
  const sql = "SELECT * FROM admin WHERE aname = ?";
  db.query(sql, [name], (err, result) => {

    if (err) return callback(err, null);
    if (result.length > 0)
       {
         return callback(null, result[0]);
    } 
    else {
      return callback(null, null);
    }
  });
};


exports.saveCourseList=(cname)=>{
    const sql="insert into course (cname)values (?)";
    
    return new Promise((resolve,reject)=>{
      db.query(sql,[cname],(err,result)=>{
        if(err)
        {
          return reject(err);
        }
        else{
          resolve(result);
        }
      })
    })
}

