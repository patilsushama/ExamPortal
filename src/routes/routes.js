
const express = require("express");
const router = express.Router();
const controller = require("../controllers/regctrl.js");

router.get("/", controller.navbar);
router .get("/logoutadmin",controller.homepage);
router.get("/homemenu",controller.homemenupage);
router.get("/coursein",controller.getcourseinfo);
router.get("/examcenter",controller.examcenterinfo);
router.get("/schdulehome",controller.getschdulehome);
router.get("/resultinfo",controller.resultappinfo);

router.get("/adminlogin", controller.adminlog);
router.post("/adminlogin", controller.adminlogin);
router.get("/adminhome", controller.adminhome);
router.get("/adinfo",controller.admininfo);
 // New GET route for displaying form
router.get("/course", controller.addcourse); 
//save course
router.post("/savecourse", controller.savecourse);
router.post("/deletecourse", controller.deletecourse);
//exam display
router.get("/examinfo",controller.getexam);
router.post("/saveexform",controller.saveexam);
router.post("/deleteexam", controller.deleteexamfrm);
//update exam
router.get("/updateexam/:id", controller.editExamForm);
router.post("/updateexam", controller.updateExam);
//question
router.get("/questioninfo", controller.getQuestionForm);
router.post("/savequestion",controller.saveques);
//delete question
router.get('/deletequestion/:id', controller.deleteQue);
router.get('/question', controller.loadQuestionPage);
//save and display schdule
router.get('/schedule', controller.getSchedule);
router.post('/schedulesave', controller.saveSchedule);
//delete schdule
router.get("/deleteschdule", controller.delschdule);
router.post("/scheduleupdate", controller.updateSchedule);


//student router

router.get("/studentlogin",controller.getstudlogin);
router.get("/studentreg",controller.registerstud);
router.post("/studentregister", controller.savestudent); 
router.post("/studlogin", controller.verifyStudentLogin);
router.get("/studentdashboard", controller.studentDashboard); 
router.get("/studentinfo", controller.getStudentInfoPage);
router.get("/studentlogout", controller.deleteAndLogoutStudent);
router.get("/examview", controller.getExamView);
router.post("/registerforexam", controller.registerForExam);
router.get("/studentexamview", controller.getStudentExamView);
router.post("/starttest", controller.startTest);
router.post("/submitTest", controller.submitTest);


module.exports = router;
