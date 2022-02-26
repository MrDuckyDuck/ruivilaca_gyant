const Ehr = require("../models/ehr");

/* @desc    Route to fetch all ehr cases. */
exports.getAllEhrCases = async ctx => {
    /* Fetch using lean to increase performance & because it is not necessary a mongoose object */
    const ehrCases = await Ehr.find().lean();
    ctx.response.body = { cases: ehrCases };
}

/* @desc    Route to logout user.
*/
exports.updateEhrCaseById = async ctx => {
    ctx.response.body = "update"
}