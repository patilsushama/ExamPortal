let db=require("../config/db.js");




exports.insertStudent = (sname, semail, spassword, scontact) => {
    return new Promise((resolve, reject) => {
     
        const checkSql = "SELECT * FROM student WHERE LOWER(semail) = LOWER(?)";
        db.query(checkSql, [semail], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
              
                return reject(new Error("Student already registered"));
            }

           
            const insertSql = "INSERT INTO student (sname, semail, spassword, scontact) VALUES ( ?, ?, ?, ?)";
            db.query(insertSql, [sname, semail, spassword, scontact], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    });
};

exports.verifyStudentFromDB = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM student WHERE sname = ? AND spassword = ?";
        db.query(sql, [username, password], (err, results) => {
            if (err) return reject(err);
            if (results.length === 1) {
                resolve(results[0]); 
            } else {
                resolve(null); 
            }
        });
    });
};


exports.getStudentByIdFromDB = (sid) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM student WHERE sid = ?";
        db.query(sql, [sid], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
exports.deleteStudentByIdFromDB = (sid) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM student WHERE sid = ?";
        db.query(sql, [sid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

