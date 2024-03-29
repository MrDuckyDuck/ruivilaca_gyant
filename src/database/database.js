const mongoose = require("mongoose");

const { MONGO_URL } = require("../constants/secrets");

const { resetDB } = require("./resetDB");

/* @desc    Connection to database
 * @note    On dev environment no database security will be used for code simplicity.
*/
mongoose.connect(MONGO_URL).then(async () => {
    console.log(`Database connected using url: ${MONGO_URL}`);

    /* Resets database - Dummy test */
    resetDB()
}).catch( (error) => {
    console.log(error)
    console.log("Database connection error.");
});
