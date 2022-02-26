const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

/* Generate an Access Token - In this case the token's TTL will be huge (1 day) to facilitate the test case. */
userSchema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign({ sub: user._id }, "secret123", { expiresIn: 24 * 60 * 60 });
    return token;
}

/* Hash the plain text password before saving */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

/* Exports model */
module.exports = mongoose.model("User", userSchema);