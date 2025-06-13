
const express = require("express");
const router = express.Router();
const controller = require("../controllers/regctrl.js");

router.get("/", controller.navbar);
router.get("/adminlogin", controller.adminlog);
router.post("/adminlogin", controller.adminlogin);
router.get("/adminhome", controller.adminhome);
router.get("/adinfo",controller.admininfo);
//display
// router.get("/cour",controller.courdisplay);
// router.get("/course",controller.courseadd);
// router.get("/adminlogout", controller.adminlogout);
router.get("/studlogin",controller.studlogin);

router.get("/addcourse",controller.addcourse);
router.post("/savecourse",controller.savecourse);


module.exports = router;
