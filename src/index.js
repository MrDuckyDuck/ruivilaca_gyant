/* Koa Dependencies */
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');

/* Env variable import */
const { PORT } = require('./constants/secrets');

/* Connect server to MongoDB */
require("./database/database");

/* Import middleware */
const { authentication } = require("./middleware/authentication");

/* Import API Routes */
const {UserRouter} = require("./routes/user");

/* Init koa app */
const app = new Koa();

/* Koa Body parser middleware */
app.use(BodyParser(/* Add BodyParser options */));
app.use(authentication);

/* Use the routes created */
app.use( UserRouter.routes() ).use( UserRouter.allowedMethods() );

/* Initiate Server */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})