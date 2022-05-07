const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

// Mongoose automatically looks for the plural, lowercased version of your model name
// Thus, the model Employee is for the employees collection in the database.
module.exports = mongoose.model('Employee', employeeSchema);