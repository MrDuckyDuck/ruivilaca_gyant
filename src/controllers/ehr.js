const Ehr = require("../models/ehr");
const Condition = require("../models/condition");

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
    const ehrCase = await Ehr.findOne({label: null}).lean();
    ctx.response.body = { case: ehrCase };
}


/* @desc    Route to update ehr case. */
/* @NOTE    This route is specific to update the EHR case when the doctor reviews. I'm assuming everything is OK with the case and no changes need to be done on the description*/
exports.updateEhrCaseById = async ctx => {
    /* No condition code provided */
    const { code } = ctx.request.body;
    if(!code) {
        return ctx.throw(400, `No condition code provided.`);
    }
    
    /* Validate is the id provided exists on the database */
    const ehrCase = await Ehr.findById(ctx.params.id).lean();
    if(!ehrCase) {
        return ctx.throw(404, `EHR case with id ${ctx.params.id} does not exist on database.`);
    }

    /* Validates if the condition code provided is a valid one */
    const conditionId = await Condition.findOne({ code }).select("_id").lean();
    if(!conditionId) {
        return ctx.throw(404, "Invalid condition code. Cannot update EHR case.");
    }
    
    await Ehr.findByIdAndUpdate(ctx.params.id, { doctor_id: ctx.state.user._id, label: conditionId, labelled: new Date() });
    ctx.response.body = null;
}