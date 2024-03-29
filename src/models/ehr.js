const mongoose = require("mongoose");

/**
 * @desc    Data schema for Condition Model
 */
const ehrSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, "Please provide a ehr description"]
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
        ref: 'User'        
    },
    label: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Condition',
        default: null
    },
    created: {
        type: Date,
        default: new Date()
    },
    labelled: {
        type: Date,
        default: null
    }
}, {versionKey: false} );

/* Exports model */
module.exports = mongoose.model("Ehr", ehrSchema);