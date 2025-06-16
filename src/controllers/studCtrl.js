
let regService=require("../services/regservice.js");
let regmodel=require("../models/regmodel.js");

exports.getNavBar=(req,res)=>
{
   res.render("nav.ejs")
};
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

exports.getExamView=(req,res)=>
{
  
    res.render("studexam.ejs");
  ;
}