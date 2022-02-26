const mongoose = require("mongoose");

/**
 * @desc    Data schema for Condition Model
 */
const conditionSchema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique: [true, "The condition code must be unique"],
        required: [true, "Please provide a condition code"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please provide a condition description"],
    }
}, {versionKey: false} );

/* Exports model */
module.exports = mongoose.model("Condition", conditionSchema);