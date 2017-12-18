var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectsSchema = new Schema({
  name: String,
  description:String,
  project_url:String,
  image_url:String
  });

var Projects=mongoose.model('Projects',ProjectsSchema);
module.exports=Projects;
