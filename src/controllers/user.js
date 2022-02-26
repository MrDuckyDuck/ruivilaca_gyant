/* @desc    Route to login user.
            Returns a token
*/
exports.postLogin = async ctx => {
    ctx.response.body = "Login"
}


/* @desc    Route to login user.
            Returns a token
*/
exports.getLogout = async ctx => {
    ctx.response.body = "Logout"
}