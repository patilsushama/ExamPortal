
let regModel = require("../models/regmodel.js");

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

