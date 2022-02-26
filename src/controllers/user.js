const User = require("../models/user");

/* @desc    Route to login user.
            Returns a token
*/
exports.postLogin = async ctx => {
    const {email, password} = ctx.request.body;

    /* Validate if user provided an email and a password */
    if(!email && !password) {
        return ctx.throw(401, "Invalid credentials.")
    }

    /* Search for an user and, if it exists, returns its password to compare it with the one provided */
    const user = await User.findOne({email}).select("+password +session");
    if(!user) {
        return ctx.throw(401, "Invalid credentials.")
    }

    /* Checks if user is already logged in. */
    if(user.session) {
        return ctx.throw(401, "User already logged in.");
    }

    /* Compares password. If ok, returns true  */
    const token = await user.comparePassword(password) ? await user.generateToken() : null;
    if (!token) {
        return ctx.throw(401, "Invalid credentials." )
    }

    /* Marks that user has an active session to avoid multiple sessions with the same account */
    await User.updateOne({_id: user._id}, {session: token}, {runValidators: true})

    ctx.response.body = token
}


/* @desc    Route to logout user.
*/
exports.getLogout = async ctx => {
    

    ctx.response.body = "Logout"
}