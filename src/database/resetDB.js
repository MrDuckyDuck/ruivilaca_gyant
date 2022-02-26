const Condition = require("../models/condition");
const EHR = require("../models/ehr");
const fs = require("fs").promises;
const util = require("util");
const path = require("path");



exports.resetDB = async () => {
    /* Drops database */
    console.log("Resetting database.");
    await Condition.deleteMany();
    await EHR.deleteMany();
    
    /* Import data - This is a static parsing for a fixed set of values for this specific case */
    console.log("Importing data");
    
    /* Conditions IMPORT */
    const fileContent = (await fs.readFile(path.join(__dirname, "data/conditions.csv"), 'utf-8')).split(/\r?\n/);
    /* Drop the first and last value because it is the header and a blank */
    fileContent.shift()
    /* For each condition, split using \t (because it is the separator on the conditions.csv) and creates doc on the Condition collection */
    for await (const condition of fileContent) {
        conditionInfo = condition.split("\t");
        await Condition.create( {code: conditionInfo[0], description: conditionInfo[1]} );
    }

    /* EHR IMPORT */
    const files = ["00D3FEF53970819CCC4D01C836555362.txt", "00F5FC934E3FCE1778B175D98B8E691C.txt", "00688F1A12C5787124CE2F75FD58F66F.txt"];
    for await (const ehrFile of files) {
        const fileContent = (await fs.readFile(path.join(__dirname, `data/${ehrFile}`), 'utf-8'));
        await EHR.create({description: fileContent})
    }
    
    console.log("Done Importing data");

}