const KoaRouter = require("koa-router");
const {getAllEhrCases, getUnreviewedCase, updateEhrCaseById} = require("../controllers/ehr");

/* Adds a prefix to all routes on this file so there is no need to repeat it on every route */
const router = new KoaRouter({
    prefix: '/api/ehrs'
});


router.get("/", getAllEhrCases );
router.get("/unreviewed", getUnreviewedCase );
router.put("/:id", updateEhrCaseById );

module.exports.EhrRouter = router
