//const mongoose = require('mongoose');
const express = require("express");
//const methodOverride = require('method-override');
const app = express();

main().catch(err => console.log(err));

async function main() {
    //await mongoose.connect('mongodb+srv://daramayo90:react-netflix-ts@cluster0.oaf7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    console.log("DB Connection Ok");
}

/*POST Process
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*PUT Process
app.use(methodOverride("_method"));
app.use(methodOverride('X-HTTP-Method-Override'))

/*Routes
app.use ('/', require('./routes/index.routes'));
*/

module.exports = app;