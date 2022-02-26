const User = require("../models/ehr");

/* @desc    Route to login user.
            Returns a token

    @note   No input sanitization is being done so if you do email: { $gt: [] } it will return the token 
*/
exports.getAllEhrCases = async ctx => {
    ctx.response.body = "get all";
}


/* @desc    Route to logout user.
*/
exports.updateEhrCaseById = async ctx => {
    ctx.response.body = "update"
}