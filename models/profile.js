var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    name: String,
    githubUserName:String,
    gitHubLink:String,
    currentcity:String,
    hobbies:String
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
