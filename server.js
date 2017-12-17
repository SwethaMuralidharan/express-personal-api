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
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/profile/:profile_id/places", description:"Places i have lived or is important to me."},

      {method: "GET", path: "/api/profile/:profile_id/projects", decsription: "Describes all my projects."},
      {method: "GET", path: "/api/profile/:profile_id/projects/:_id",description: "displays particular project info"},
      {method: "POST",path: "/api/profile/:profile_id/projects",description:"creates new project"},

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

/* End point 3 - */
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
