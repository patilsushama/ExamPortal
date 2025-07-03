
let regService = require("../services/regservice.js");
let regModel = require("../models/regmodel.js"); 
const db = require("../config/db.js"); 


// home page
exports.navbar = (req, res) => {
  res.render("home.ejs");
};
exports.homepage=(req,res)=>
{
  res.render("home.ejs");
}
exports.homemenupage=(req,res)=>
{
  res.render("homemenu.ejs");
}

exports.getcourseinfo=(req,res)=>
{
  res.render("courseinfo.ejs");
}
  exports.examcenterinfo=(req,res)=>
{
  res.render("Examcenter.ejs");
}
 exports.getschdulehome=(req,res)=>
{
  res.render("scedulehome.ejs");
}

exports.resultappinfo=(req,res)=>
{
  res.render("result.ejs");
}

// show admin login page
exports.adminlog = (req, res) => {
  res.render("adminlogin.ejs", { msg: "" });
};

//handle admin login
exports.adminlogin = (req, res) => {
  const { admin_name, admin_pass } = req.body;

  regService.validateAdminLogin(admin_name, admin_pass, (err, admin) => {
    if (err) {
      console.error("Login Error:", err);
      return res.render("adminlogin.ejs", { msg: "Server error" });
    }

    if (admin) 
      {
      req.session.admin = admin.aname;//admin name save into session
      return res.redirect("/adminhome");
    } 
    else 
    {
      return res.render("adminlogin.ejs", { msg: "Invalid username or password" });
    }
  });
};

//admin dashboard
exports.adminhome = (req, res) => {
  if (!req.session.admin) {
    return res.redirect("/adminlogin");
  }
  res.render("admindashboard.ejs", { adminName: req.session.admin });//display admindashboard and pass the name from session to the view or it can be displayed.
};

//admin dashboard =admin info display.
exports.admininfo = (req, res) => {
  if (!req.session.admin) {
    return res.redirect("/adminlogin");
  }

  regModel.getAdminByName(req.session.admin, (err, adminData) => {
    if (err) {
      return res.send("Database error");
    }
    if (adminData)
       {
      res.render("admininfo.ejs", { admin: adminData });
    } 
    else
     {
      res.send("Admin not found");
    }
  });
};

// Load addcourse page with existing data
exports.addcourse = (req, res) => {
    regModel.fetchCourseList() 
        .then(courseList => {
            res.render("course", { courseList, msg: req.query.msg || "" });
        })
        .catch(err => {
            console.log("Error fetching course list:", err);
            res.render("course", { courseList: [], msg: "Error loading courses" });
        });
};

//save course
exports.savecourse = (req, res) => {
    const { cname } = req.body;
    regModel.saveCourseList(cname)
        .then(() => {
            res.redirect('/course?msg=Course added successfully');
        })
        .catch((err) => {
            console.log("Error saving course:", err);
            res.redirect('/course?msg=Error adding course');
        });
};
//delete course

exports.deletecourse = (req, res) => {
  const courseId = req.body.cid;

  regModel.deleteCourseById(courseId)
    .then(() => {
      res.redirect('/course');  
    })
    .catch((err) => {
      console.log("Error deleting course:", err);
      res.redirect('/course');  
    });
};

 //exam form display.
exports.getexam = (req, res) => {
  regModel.getAllExam()
    .then((exams) => {
      res.render("Exam", {
        examlist: exams,
        editingExam: null
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.send("Database error");
    });
};

//examform save
exports.saveexam=(req,res)=>{
  const{exname,totalmark,passingmark}=req.body;
  regModel.saveExamForm(exname,totalmark,passingmark)
  .then(()=>{
     res.redirect("/examinfo?msg=Form Submit Successfully");
       // res.send("Form Submit Successfully")
  })
  .catch((err)=>{
    console.log("Error form submition:",err);
    res.redirect("/examinfo?msg=Error form submition");
    res.send("Error form submission" );

  });
};



//delete exam
exports.deleteexamfrm=(req,res)=>{
 const exid=req.body.ex_id;

 regModel.deleteExamById(exid)
  .then(()=>{
   res.redirect("/examinfo");
  })
  .catch((err)=>{
    console.log("Error deleting exam:",err);
    res.redirect("/examinfo");
  });
};

//update exam
exports.editExamForm = (req, res) => {
  const exid = req.params.id;

  regModel.getExamById(exid)
    .then((exam) => {
      if (!exam) {
        return res.send("Exam not found");
      }
      regModel.getAllExam()
        .then((examlist) => {
          res.render("Exam", {
            examlist,
            editingExam: exam  
          });
        });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.send("Server error");
    });
};

exports.updateExam = (req, res) => {
  const { ex_id, exname, totalmark, passingmark } = req.body;

  regModel.updateExamForm(ex_id, exname, totalmark, passingmark)
    .then(() => {
      res.redirect("/examinfo?msg=Exam updated successfully");
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.redirect("/examinfo?msg=Update failed");
    });
};

//display question
exports.getQuestionForm = (req, res) => {
  const message = req.query.msg || null;

  db.query("SELECT * FROM course", (err, courses) => {
    if (err) return res.status(500).send("Database error while fetching courses");

    db.query("SELECT * FROM question", (err2, questions) => {
      if (err2) return res.status(500).send("Database error while fetching questions");

      res.render("question", {
        courseList: courses,
        questionList: questions,
        message: message  
      });
    });
  });
};
//save question
exports.saveques = (req, res) => {
  const { qname, op1, op2, op3, op4, answer, cid } = req.body;
  console.log("Received CID:", cid);

regModel.insertQuestion(qname, op1, op2, op3, op4, answer, (err, insertId) => {
  if (err) {
    console.error("Insert Question Error:", err);  // Log the actual DB error
    return res.status(500).send("Error saving question");
  }
  regModel.linkCourseToQuestion(insertId, cid, (err2) => {
      if (err2) return res.status(500).send("Error linking question to course");

      res.redirect('/questioninfo');
    });
  });
};

//delete question
exports.deleteQue = (req, res) => {
  const id = req.params.id;

  regModel.deleteQuestion(id, (err, result) => {
    if (err) {
      console.error("Error deleting question:", err);
      return res.status(500).send("Failed to delete");
    }

    res.redirect('/question'); 
  });
};
exports.loadQuestionPage = (req, res) => {
  db.query('SELECT * FROM question', (err, results) => {
    if (err) return res.status(500).send("Database error");
    db.query('SELECT * FROM course', (err2, courses) => {
      if (err2) return res.status(500).send("Course fetch error");

      res.render('question', {
        questionList: results,
        courseList: courses,
        message: req.query.message || null
      });
    });
  });
};


//display
exports.getSchedule = async (req, res) => {
  const editId = req.query.edit;
  const [courses, exams, schedules] = await Promise.all([
    regModel.getAllCourses(),
    regModel.getAllExams(),
    regModel.getAllSchedules(),
  ]);
  let selectedSchedule = null;
  if (editId) {
    selectedSchedule = await regModel.getScheduleById(editId);
    selectedSchedule.date = new Date(selectedSchedule.date);
  }
  res.render("schedule", { courses, exams, schedules, selectedSchedule });
};


//ssave schdule
exports.saveSchedule = async (req, res) => {
  const { date, starttime, endtime, cid, eid } = req.body;
  try {
    await regModel.saveSchedule([date, starttime, endtime, cid, eid]);
    res.redirect("/schedule");
  } catch (err) {
    console.error("Error saving schedule:", err);
    res.status(500).send("Failed to save schedule");
  }
};

//delete schdule
exports.delschdule=(req,res)=>{
   const id= req.query.id;

   regModel.deleteSchdule(id,(err,result)=>{
    if(err)
    {
     
      console.log("error:",err);
    return res.status(500).send("Error deleting schedule");
    }
     res.redirect("/schedule");
   });
};

exports.updateSchedule = async (req, res) => {
  try {
    const { schid, date, starttime, endtime, cid, eid } = req.body;
    const data = [date, starttime, endtime, cid, eid, schid];

    await regModel.updateSchedule(data);
    res.redirect("/schedule");
  } catch (err) {
    console.error("Failed to update schedule:", err);
    res.status(500).send("Update failed");
  }
};


//student controller

exports.getstudlogin=(req,res)=>
{
   res.render("student.ejs")
};
exports.registerstud = (req, res) => {
   
     const message = req.query.message || null;
    res.render("studregister.ejs", { message });
};

exports.savestudent = async (req, res) => {
    const { sname, semail, spassword, scontact} = req.body;

    try {
        const sid = await regService.saveStudent(sname, semail, spassword, scontact);
        req.session.sid = sid;
        req.session.sname = sname;

        res.redirect("/studentreg?message=" + encodeURIComponent("Registration Successful"));
    } catch (err) {
       
        let msg;
        if (err.code === "ER_DUP_ENTRY" || (err.message && err.message.includes("Duplicate entry"))) {
            msg = "Already Registered.";
        } else {
            msg = "Error: " + err.message;
        }

        res.redirect("/studentreg?message=" + encodeURIComponent(msg));
    }
};


exports.verifyStudentLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const student = await regService.verifyLogin(username, password);
        if (student) {
            req.session.sid = student.sid;
            req.session.sname = student.sname;
            res.redirect("/studentdashboard");
        } else {
           
            res.render("student.ejs", { errorMessage: "Invalid username or password" });
        }
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};


exports.studentDashboard = (req, res) => {
    if (!req.session.sid) {
        return res.redirect("/studentlogin");
    }
    res.render("studdashboard.ejs", { sname: req.session.sname });
};

exports.getStudentInfoPage = async (req, res) => {
    if (!req.session.sid) {
        return res.redirect("/studentlogin");
    }

    try {
        const student = await regService.getStudentById(req.session.sid);
        res.render("studinfo.ejs", { student });
    } catch (err) {
        res.status(500).send("Error fetching student info: " + err.message);
    }
};

exports.deleteAndLogoutStudent = async (req, res) => {
    const sid = req.session.sid;

    if (!sid) {
        return res.redirect("/studentlogin");
    }

    try {
        await regService.deleteStudentById(sid);   
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error ending session");
            }
            res.redirect("/studentlogin");  
        });
    } catch (err) {
        res.status(500).send("Error deleting student: " + err.message);
    }
};


exports.getExamView = async (req, res) => {
    if (!req.session.sid) {
        return res.redirect("/studentlogin");
    }

    try {
        const sid = req.session.sid;
        const student = await regService.getStudentById(sid);
        const exams = await regService.getStudentExamSchedule(sid);

       
        const successMessage = req.query.message || null;

        res.render("studExamRegister.ejs", {
            student,
            exams,
            successMessage
        });
    } catch (err) {
        res.status(500).send("Error fetching exam view: " + err.message);
    }
};


exports.registerForExam = async (req, res) => {
    if (!req.session.sid) {
        return res.redirect("/studentlogin");
    }

    const sid = req.session.sid;
    const schid = req.body.schid;

    console.log("Submitted schid:", schid); 

    if (!schid) {
        return res.redirect("/examview?message=" + encodeURIComponent("Please select an exam schedule."));
    }

    try {
        await regService.saveExamRegistration(sid, schid);
        res.redirect("/examview?message=" + encodeURIComponent("Registration successful."));
    } catch (err) {
        const msg = "Error registering for exam: " + err.message;
        res.redirect("/examview?message=" + encodeURIComponent(msg));
    }
};
exports.getStudentExamView = async (req, res) => {
  if (!req.session.sid) {
    return res.redirect("/studentlogin");
  }

  try {
    const exams = await regService.getRegisteredExamsByStudentId(req.session.sid);
    res.render("studexam.ejs", { exams });
  } catch (err) {
    res.status(500).send("Error loading exam view: " + err.message);
  }
};

exports.startTest = async (req, res) => {
  const { cid, schid } = req.body;
  try {
    const questions = await regModel.getQuestionsByCourseId(cid);
    const schedule = await regModel.getScheduleById(schid);

    if (!questions || questions.length === 0) {
      return res.send("No questions found for this course.");
    }
    req.session.cid = cid;
    req.session.schid = schid;
    res.render("startTest", {
      questions,
      schedule,
      cid,
      schid
    });
  } catch (err) {
    console.error("Start Test Error:", err);
    res.status(500).send("Server Error");
  }
};

exports.submitTest = async (req, res) => {
  const { answers, cid, schid } = req.body;
  const sid = req.session.sid;

  if (!answers || !sid || !cid || !schid) {
    return res.status(400).send("Missing data. Cannot submit test.");
  }

  try {
    const questions = await regModel.getQuestionsWithCorrectAnswers(cid);

    let correct = 0, wrong = 0, unanswered = 0;

    const detailedResults = questions.map(q => {
      const qidStr = q.qid.toString();

      // ❗ Check if the question was attempted
      const answerValue = answers[qidStr];

      // null if unanswered
      const studentAns = typeof answerValue !== "undefined" && answerValue !== "" ? parseInt(answerValue) : null;

      const isCorrect = studentAns === q.correct;

      if (studentAns === null) {
        unanswered++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }

      return {
        ...q,
        studentAnswer: studentAns,
        isCorrect
      };
    });

    const resultSummary = {
      total: questions.length,
      correct,
      wrong,
      unanswered
    };

    res.render("testResult", {
      message: " Test Submitted Successfully!",
      summary: resultSummary,
      questions: detailedResults,
      cid,
      schid
    });

  } catch (err) {
    console.error("Error in test submission:", err);
    res.status(500).send("Server error during submission.");
  }
};




