const KoaRouter = require("koa-router");
const {postLogin, getLogout} = require("../controllers/user");

/* Adds a prefix to all routes on this file so there is no need to repeat it on every route */
const router = new KoaRouter({
    prefix: '/api/users'
});


router.post("/login", postLogin);
router.get("/logout", getLogout);

module.exports.UserRouter = router
