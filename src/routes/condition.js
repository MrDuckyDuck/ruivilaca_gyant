const KoaRouter = require("koa-router");
const { getAllConditions } = require("../controllers/condition");

/* Adds a prefix to all routes on this file so there is no need to repeat it on every route */
const router = new KoaRouter({
    prefix: '/api/conditions'
});


router.get("/", getAllConditions );


module.exports.ConditionRouter = router
