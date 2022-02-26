const Condition = require("../models/condition");

/* @desc    Route to fetch all conditions
            Returns a list of conditions
*/
exports.getAllConditions = async ctx => {
    ctx.response.body = await Condition.find().lean().select("-_id");
}