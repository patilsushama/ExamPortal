
let regModel = require("../models/regmodel.js");

exports.validateAdminLogin = (admin_name, admin_pass, callback) => {
  regModel.getAdminByCredentials(admin_name, admin_pass, callback);
};

//student service

exports.saveStudent = (sname, semail, spassword, scontact) => {
    return regModel.insertStudent(sname, semail, spassword, scontact);
};
exports.verifyLogin = (username, password) => {
    return regModel.verifyStudentFromDB(username, password);
};

exports.getStudentById = (sid) => {
    return regModel.getStudentByIdFromDB(sid);
};
exports.deleteStudentById = (sid) => {
    return regModel.deleteStudentByIdFromDB(sid);
};


exports.getStudentExamSchedule = (sid) => {
    return new Promise((resolve, reject) => {
        regModel.getStudentExamSchedule(sid, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

exports.saveExamRegistration = (sid, schid) => {
  return regModel.insertExamRegistration(sid, schid);
};
exports.getRegisteredExamsByStudentId = (sid) => {
  return new Promise((resolve, reject) => {
    regModel.getRegisteredExams(sid, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
