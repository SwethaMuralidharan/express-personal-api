var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

// module.exports.Campsite = require("./campsite.js.example");
module.exports.Profile=require("./profile.js")
module.exports.Projects=require("./projects.js");
module.exports.Vacation=require("./vacation.js");
