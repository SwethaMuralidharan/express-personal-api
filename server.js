var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

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
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/SwethaMuralidharan/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://enigmatic-caverns-31537.herokuapp.com/", // CHANGE ME
    endpoints: [
      { 
        method: "GET", 
        path: "/api", 
        description: "Describes all available endpoints"
      },
      { 
        method: "GET", 
        path: "/api/profile", 
        description: "Data about me"
      },

      { 
        method: "POST",
        path: "/api/profile/:profile_id/projects",
        description:"creates new project"
      },
      { 
        method: "DELETE", 
        path:"/api/profile/:profile_id/projects/:_id", 
        description:"deletes that project"
      },
      { 
        method: "PUT", 
        path:"/api/profile/:profile_id/projects/:_id", 
        description:"Updates that project by ID"
      },

      { 
        method: "GET", 
        path: "/api/profile/:profile_id/vacation",
        description:"destinations i've visited"
      },
      { 
        method: "POST",
        path:"/api/profile/:profile_id/vacation",
        description:"Creates an entry for vacations under planning"
      }
    ]
  })
});

app.get('/api/profile', function show(req, res) {
  db.Profile.find({},function(err,new_profile){
    if(err) { console.log(" new profile not exist", err)}
    res.json(new_profile);
  })
});

app.post('/api/profile/:profile_id/projects',function(req,res){
  db.Profile.findById(req.params.profile_id, function(err,foundProfile){
    var newProject = new db.Projects(req.body);

    foundProfile.projects.push(newProject);
    foundProfile.save(function(err,savedProfile){
      res.json(savedProfile);
    });
  })
});

app.delete("/api/profile/:profile_id/projects/:_id",function destroy(req, res) {
  db.Profile.findById(req.params.profile_id, function(err, foundProfile) {
    var correctProj = foundProfile.projects.find(proj => proj._id == req.params._id);
    if (correctProj) {
      correctProj.remove();

      foundProfile.save(function(err, saved) {
        console.log('REMOVED ', correctProj.name);
        res.json(correctProj);
      });
    }
  });
});

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

app.post('/api/profile/:profile_id/vacation',function(req,res){
  db.Profile.findById(req.params.profile_id,function(err,foundProfile){
    var newVacation=new db.Vacation(req.body);

    foundProfile.vacation.push(newVacation);
    foundProfile.save(function(err,savedProfile){
      res.json(savedProfile);
    });
  });
});

app.get('/api/profile/:profile_id/vacation',function(req,res){
  db.Profile.findById(req.params.profile_id,function(err,foundProfile){
    if(err){ console.log("Get All projects Method Error",err);}
    res.json(foundProfile.vacation);
  })
})

/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
