/* Koa Dependencies */
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');

const { PORT } = require('./constants/secrets');

const app = new Koa();

app.use(BodyParser(/* Add BodyParser options */));

/* Initiate Server */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})