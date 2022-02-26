/* Koa Dependencies */
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');

/* Env variable import */
const { PORT } = require('./constants/secrets');

/* Connect server to MongoDB */
require("./database/database");

const app = new Koa();

app.use(BodyParser(/* Add BodyParser options */));

/* Initiate Server */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})