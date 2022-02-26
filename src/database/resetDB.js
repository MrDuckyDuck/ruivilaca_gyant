const Condition = require("../models/condition");
const fs = require("fs").promises;
const util = require("util");
const path = require("path");



exports.resetDB = async () => {
    /* Drops database */
    console.log("Resetting database.");
    await Condition.deleteMany();
    
    /* Import data - This is a static parsing for a fixed set of values for this specific case */
    console.log("Importing data");
    const fileContent = (await fs.readFile(path.join(__dirname, "conditions.csv"), 'utf-8')).split(/\r?\n/);
    /* Drop the first and last value because it is the header and a blank */
    fileContent.shift()
    /* For each condition, split using \t (because it is the separator on the conditions.csv) and creates doc on the Condition collection */
    for await (const condition of fileContent) {
        conditionInfo = condition.split("\t");
        await Condition.create( {code: conditionInfo[0], description: conditionInfo[1]} )
    }
    console.log("Done Importing data");

}