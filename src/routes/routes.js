
const express = require("express");
const router = express.Router();
const controller = require("../controllers/regctrl.js");

router.get("/", controller.navbar);
router.get("/adminlogin", controller.adminlog);
router.post("/adminlogin", controller.adminlogin);
router.get("/adminhome", controller.adminhome);
router.get("/adinfo",controller.admininfo);

router.get("/studlogin",controller.studlogin);
 // New GET route for displaying form
router.get("/course", controller.addcourse); 
//save course
router.post("/savecourse", controller.savecourse);
router.post("/deletecourse", controller.deletecourse);



module.exports = router;
