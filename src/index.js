/* Koa Dependencies */
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Cors = require('@koa/cors')

/* Env variable import */
const { PORT } = require('./constants/secrets');

/* Connect server to MongoDB */
require("./database/database");

/* Import middleware */
const { authentication } = require("./middleware/authentication");

/* Import API Routes */
const { UserRouter } = require("./routes/user");
const { EhrRouter } = require("./routes/ehr");
const { ConditionRouter } = require("./routes/condition");
const { use } = require('bcrypt/promises');

/* Init koa app */
const app = new Koa();

/* Koa Body parser middleware */
app.use(Cors({
    allowMethods: ['GET','HEAD','PUT','POST','DELETE','PATCH','OPTIONS'],
    credentials : true,
    keepHeadersOnError: true
}));
app.use(BodyParser(/* Add BodyParser options */));
app.use(authentication);

/* Use the routes created */
app.use( UserRouter.routes() ).use( UserRouter.allowedMethods() );
app.use( EhrRouter.routes() ).use( EhrRouter.allowedMethods() );
app.use( ConditionRouter.routes() ).use( ConditionRouter.allowedMethods() );

/* Initiate Server */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})