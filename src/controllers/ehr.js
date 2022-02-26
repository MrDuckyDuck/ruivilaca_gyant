const Ehr = require("../models/ehr");

/* @desc    Route to fetch all ehr cases. */
exports.getAllEhrCases = async ctx => {
    /* Fetch using lean to increase performance & because it is not necessary a mongoose object */
    const ehrCases = await Ehr.find().lean();
    ctx.response.body = { cases: ehrCases };
}


/* @desc    Route a single case unreviewed */
/* @note    This could be a single GET ALL route accepting different parameters and performing a flexible get with different parameters combination
            Made this way to simplify the code
*/
exports.getUnreviewedCase = async ctx => {
    /* Fetch using lean to increase performance & because it is not necessary a mongoose object */
    const ehrCase = await Ehr.find({label: null}).limit(1).lean();
    ctx.response.body = { case: ehrCase.length > 0 ? ehrCase[0] : []  };
}

/* @desc    Route to logout user.
*/
exports.updateEhrCaseById = async ctx => {
    ctx.response.body = "update"
}