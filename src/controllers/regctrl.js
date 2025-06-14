
let regService = require("../services/regservice.js");
let regModel = require("../models/regmodel.js"); 
const db = require("../config/db.js"); 


// home page
exports.navbar = (req, res) => {
  res.render("nav.ejs");
};

// Render admin login page
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
      req.session.admin = admin.aname;
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
  res.render("admindashboard.ejs", { adminName: req.session.admin });
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

// //courepage display
// exports.courdisplay=(req,res)=>{
//   res.render(course.ejs);
// };


// //course
//  exports.courseadd=(req,res)=>{
//   if(!req.session.admin){
//     return res.redirect("/adminlogin");
//   }
//   res.render("course.ejs");
//  }


// Logout
exports.adminlogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Logout error");
    res.redirect("/adminlogin");
  });
};

exports.studlogin = (req, res) => {
  res.render("studlogin.ejs", { userType: "Admin" });
};

exports.addcourse=(req,res)=>{
    res.render("course.ejs");
}
exports.savecourse=(req,res)=>{
  const {cname}=req.body;
  regModel.saveCourseList(cname).then(()=>{
    res.send("course save sucefulyy")
  })
  .catch((err)=>{
   console.log("Error saving course:", err);
  })
}