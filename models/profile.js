var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Projects=require("./projects.js");
var Vacation=require("./vacation.js");

var ProfileSchema = new Schema({
    name: String,
    githubUserName:String,
    gitHubLink:String,
    currentcity:String,
    hobbies:String,
    projects:[ Projects.schema ],
    vacation: [ Vacation.schema ]
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
