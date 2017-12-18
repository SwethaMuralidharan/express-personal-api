var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VacationSchema = new Schema({
  place: String,
  topdestinationPoints:String,
  travelPeriod:String
  });

var Vacation=mongoose.model('Vacation',VacationSchema);
module.exports=Vacation;
