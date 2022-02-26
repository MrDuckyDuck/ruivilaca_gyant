const { JWT_SECRET } = require("../constants/secrets");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * @desc    Function to verify if user has a active session and if is allowed to access the routes 
 */
exports.authentication = async (ctx, next) => {
    next()
    // /* If user is trying to login redirect him to the controller. No sense to validate token here */
    // if(ctx.request.method === 'POST' && ctx.request.url === "/api/users/login") {
    //     return next();
    // } 


    // /* Extract token from user request and check if it exists. If not, returns forbidden */
    // const token = ctx.request.header.authorization;
    // if( !token ) {
    //     return ctx.throw(401, "No authentication token provided");
    // }


    // /* Check if the token is valid */
    // const decoded = jwt.verify(token, JWT_SECRET);
    // if(decoded) {
    //     const user = await User.findById(decoded.sub).select("+session");
    //     if(user && user.session === token) {
    //         ctx.state.user = user;
    //         return next();
    //     }
    //     return ctx.throw(404, "Invalid token!");
    // }
    // return ctx.throw(404, "Invalid token!");
}
