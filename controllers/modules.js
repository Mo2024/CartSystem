var onlyNumRegex = new RegExp('^\d+$')
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
var userRegex = new RegExp("^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
var nameRegex = new RegExp("^([^0-9]*)$");


exports.onlyNumRegex = onlyNumRegex;
exports.strongRegex = strongRegex;
exports.emailRegex = emailRegex;
exports.userRegex = userRegex;
exports.nameRegex = nameRegex;
