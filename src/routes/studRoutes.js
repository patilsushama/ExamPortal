let express=require("express");
let router=express.Router();
 let controller=require("../controllers/regctrl.js");
 

router.get("/", controller.getNavBar);

router.get("/studentlogin",controller.getstudlogin);
router.get("/studentreg",controller.registerstud);
router.post("/studentregister", controller.savestudent); 
router.post("/studlogin", controller.verifyStudentLogin);
router.get("/studentdashboard", controller.studentDashboard); 
router.get("/studentinfo", controller.getStudentInfoPage);
router.get("/studentlogout", controller.deleteAndLogoutStudent);
router.get("/examview",controller.getExamView)

module.exports=router;
