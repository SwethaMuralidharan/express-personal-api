// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db=require('./models');
var new_profile={
  name:"Swetha",
  githubUserName:"SwethaMuralidharan",
  gitHubLink:"https://github.com/SwethaMuralidharan/",
  currentcity:"Dublin,California",
  hobbies:"Cooking, Hiking, Singing"
}
db.Profile.create(new_profile,function(err,profile_id){
  if(err){
    return console.log("Error:", err);
  }
  console.log("Profile Created with the ID : ",profile_id)
  process.exit();
})
