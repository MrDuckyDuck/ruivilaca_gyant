const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @desc    Data schema for Condition Model
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        required: [true, "Please provide an email"],
        trim: true,
        lowercase: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email" ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [7, "Password min 7 characters"],
        trim: true,
        match: [/^(?!.*password).*$/, "Password cannot contain the word 'password'"],
        select: false
    },
    session: {
        type: Boolean,
        select: false,
        default: false
    }
}, {versionKey: false} );


/* Hash the plain text password before saving */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

/* Exports model */
module.exports = mongoose.model("User", userSchema);