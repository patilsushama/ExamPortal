
let regModel = require("../models/regmodel.js");

exports.validateAdminLogin = (admin_name, admin_pass, callback) => {
  regModel.getAdminByCredentials(admin_name, admin_pass, callback);
};
