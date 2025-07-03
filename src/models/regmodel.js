//admin login
let db = require("../config/db.js");

exports.getAdminByCredentials = (admin_name, admin_pass, callback) => {
  const query = "SELECT * FROM admin WHERE aname = ? AND apassword = ?";
  db.query(query, [admin_name, admin_pass], (err, results) => {
    if (err) 
      return callback(err, null);//server error occured
    if (results.length > 0) 
      {
      return callback(null, results[0]);
    } 
    else {
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

// Insert course
exports.saveCourseList = (cname) => {
  const sql = "INSERT INTO course (cname) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [cname], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//fetch course data
exports.fetchCourseList = function () {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM course";
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

//  Delete course by ID
exports.deleteCourseById = (cid) => {
  const sql = "DELETE FROM course WHERE cid = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [cid], (err, result) => {
      if (err) 
        return reject(err);
      resolve(result);
    });
  });
};


//exam form submit
 exports.saveExamForm=(exname,totalmark,passingmark)=>{
  const sql="insert into exam (exname,totalmark,passingmark) values(?,?,?)";
  return new Promise((resolve,reject)=>{
    db.query(sql,[exname,totalmark,passingmark],(err,result)=>{
      if(err)
        return reject(err);
      resolve(result);
    });
  });
 };


 //fetch examdetails
exports.getAllExam= function(){
  return new Promise((resolve,reject)=>{
    const query="select * from exam";
    db.query(query,(err,result)=>{
      if(err)
      {
        reject(err);
      }
      else
      {
        resolve(result);
      }
    });
  });
};


//exam delete
exports.deleteExamById=(exid)=>{
  const sql="delete from exam where ex_id=?";
  return new Promise((resolve,reject)=>{
    db.query(sql,[exid],(err,result)=>{
      if(err)
        return reject(err);
      resolve(result);
    });
  });
};

//update exam

exports.getExamById = (exid) => {
  const sql = "SELECT * FROM exam WHERE ex_id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [exid], (err, result) => {
      if (err) return reject(err);
      if (result.length > 0) resolve(result[0]);
      else resolve(null);
    });
  });
};

exports.updateExamForm = (ex_id, exname, totalmark, passingmark) => {
  const sql = "UPDATE exam SET exname = ?, totalmark = ?, passingmark = ? WHERE ex_id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [exname, totalmark, passingmark, ex_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


//save question
exports.insertQuestion = (qname, op1, op2, op3, op4, answer, callback) => {
  const insertQuery = "INSERT INTO question (qname, op1, op2, op3, op4, answer) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [qname, op1, op2, op3, op4, answer];

  db.query(insertQuery, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};

exports.linkCourseToQuestion = (qid, cid, callback) => {
  const joinQuery = "INSERT INTO coursequestionjoin (qid, cid) VALUES (?, ?)";
  db.query(joinQuery, [qid, cid], callback);
};
exports.getCourses = (callback) => {
  db.query("SELECT * FROM course", callback);
};
exports.getQuestions = (callback) => {
  db.query("SELECT * FROM question", callback);
};


//delete question
exports.deleteQuestion = (id, callback) => {
  const sql = 'DELETE FROM question WHERE qid = ?';
  db.query(sql, [id], callback);
};

// Get all courses
exports.getAllCourses = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM course", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Get all exams
exports.getAllExams = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM exam", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Get all schedules with joined data
exports.getAllSchedules = () => {
  const sql = `SELECT s.*, c.cname AS course, e.exname AS exam 
               FROM schedule s 
               JOIN course c ON s.cid = c.cid 
               JOIN exam e ON s.ex_id = e.ex_id`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Save a new schedule
exports.saveSchedule = (data) => {
  const sql = `INSERT INTO schedule (date, starttime, endtime, cid, ex_id) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

//delete schdule
exports.deleteSchdule=(id,callback)=>{
  const sql="Delete from schedule where schid=?";
  db.query(sql,[id],callback);
};
 
// Update an existing schedule
exports.updateSchedule = (data) => {
  const sql = `UPDATE schedule SET date = ?, starttime = ?, endtime = ?, cid = ?, ex_id = ? WHERE schid = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Get schedule by ID
exports.getScheduleById = (id) => {
  const sql = `SELECT * FROM schedule WHERE schid = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]); // return first match
    });
  });
};


//student model



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

exports.getStudentExamSchedule = (sid, callback) => {
    const sql = `
    SELECT 
        sch.schid, 
        s.sname,
        s.semail,
        s.spassword,
        s.scontact,
        c.cname,
        sch.date,
        sch.starttime,
        sch.endtime,
        e.exname,
        e.totalmark,
        e.passingmark
    FROM student s
    JOIN csjoin cs ON s.sid = cs.sid
    JOIN course c ON cs.cid = c.cid
    JOIN schedule sch ON c.cid = sch.cid
    JOIN exam e ON sch.ex_id = e.ex_id
    WHERE s.sid = ?
`;
    db.query(sql, [sid], callback);
};

exports.insertExamRegistration = (sid, schid) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO exam_registration (sid, schid) VALUES (?, ?)";
    db.query(sql, [sid, schid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
exports.getRegisteredExams = (sid, callback) => {
const sql = `
  SELECT 
    s.sname,
    c.cname,
    c.cid,             
    sch.schid,          
    sch.date,
    sch.starttime,
    sch.endtime,
    e.exname,
    e.totalmark,
    e.passingmark
  FROM exam_registration er
  JOIN student s ON er.sid = s.sid
  JOIN schedule sch ON er.schid = sch.schid
  JOIN course c ON sch.cid = c.cid
  JOIN exam e ON sch.ex_id = e.ex_id
  WHERE s.sid = ?
`;

  db.query(sql, [sid], callback);
};

exports.getQuestionsByCourseId = async (cid) => {
  const [rows] = await db.promise().query(`
    SELECT q.qid, q.qname, q.op1, q.op2, q.op3, q.op4
    FROM question q
    INNER JOIN coursequestionjoin cjq ON q.qid = cjq.qid
    WHERE cjq.cid = ?
  `, [cid]);

  return rows;
};

exports.getScheduleById = (schid) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT schid, cid, date, starttime, endtime 
      FROM schedule 
      WHERE schid = ?
    `;
    db.query(sql, [schid], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
exports.getQuestionsWithCorrectAnswers = async (cid) => {
  const [rows] = await db.promise().query(`
    SELECT q.qid, q.qname, q.op1, q.op2, q.op3, q.op4, q.answer AS correct
    FROM question q
    INNER JOIN coursequestionjoin cjq ON q.qid = cjq.qid
    WHERE cjq.cid = ?
  `, [cid]);

  return rows;
};


