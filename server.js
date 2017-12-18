// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/SwethaMuralidharan/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://enigmatic-caverns-31537.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"}, // done
      {method: "GET", path: "/api/profile", description: "Data about me"}, // done

      {method: "GET", path: "/api/profile/projects", decsription: "Describes all my projects."}, // done
      {method: "GET", path: "/api/profile/:profile_id/projects/:_id",description: "displays particular project info"}, //done
      {method: "POST",path: "/api/profile/:profile_id/projects",description:"creates new project"}, //done
      {method: "DELETE", path:"/api/profile/:profile_id/projects/:_id", description:"deletes that project"},//done
      {method: "PUT", path:"/api/profile/:profile_id/projects/:_id", description:"Updates that project by ID"},//done

      {method: "GET", path: "/api/profile/:profile_id/holidaydestination",description:"destinations i've visited"},
      {method: "POST",path:"/api/profile/:profile_id/holidaydestination",description:"Creates an entry for vacations under planning"}

    ]
  })
});

/*End Point 2 - Get Profile Info*/
app.get('/api/profile', function show(req, res) {
  console.log("inside get profile",req.body);
  db.Profile.find({},function(err,new_profile){
    if(err) { console.log(" new profile not exist", err)}
    res.json(new_profile);
  })
});

/* End point 3 - Get All Projects */
app.get('/api/profile/projects', function(req,res){
  console.log("inside get projects", req);
  db.Profile.find({},function(err,projects){
    if(err){ console.log("Get All projects Method Error",err);}
    res.json(projects);
  })
});

/* End Point 4 - Create new project*/
app.post('/api/profile/:profile_id/projects',function(req,res){
  console.log(`inside create projects method ${req}`);
  console.log(JSON.stringify(req.body));
  db.Profile.findById(req.params.profile_id,function(err,foundProfile){

  var newProject=new db.Projects(req.body);

  foundProfile.projects.push(newProject);
  foundProfile.save(function(err,savedprofile){
    res.json(savedprofile);
  })
})
});

/* End Point 5 - Show one project by ID*/
app.get('/api/profile/:profile_id/projects/:_id',function(req,res){
  console.log("inside getbyID");
  db.Profile.findById(req.params._id, function(err, foundproj) {
    res.json(foundproj);
  });

})

/*End Point 6 - delete project by ID*/
app.delete("/api/profile/:profile_id/projects/:_id",function destroy(req, res) {
  db.Profile.findById(req.params.profile_id, function(err, foundproj) {
    console.log(foundproj);

    var correctProj = foundproj.projects.id(req.params._id);
    if (correctProj) {
      correctProj.remove();

      foundproj.save(function(err, saved) {
        console.log('REMOVED ', correctProj.name);
        res.json(correctProj);
      });
    }
  });
});

/* End Point 7 - update project*/
app.put("/api/profile/:profile_id/projects/:_id",function update(req, res) {
  db.Profile.findById(req.params.profile_id, function(err, foundProfile) {
    var correctProj = foundProfile.projects.id(req.params._id);

    if (correctProj) {

      correctProj.name = req.body.name;
      correctProj.description = req.body.description;
      correctProj.project_url=req.body.project_url;
      correctProj.image_url=req.body.image_url;

      foundProfile.save(function(err, saved) {
        console.log('UPDATED', correctProj);
        res.json(correctProj);
      });
    }
  });
});
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
