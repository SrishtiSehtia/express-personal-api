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
// var Project = require('./models/project');

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
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/SrishtiSehtia/express-personal-api", // CHANGE ME
    baseUrl: "https://murmuring-citadel-86863.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/projects", description: "E.g. Create a new project"} // CHANGE ME
    ]
  })
});


app.get('/api/profile', function apiIndex(req, res) {
  res.json({
    name: 'Srishti Sehtia',
    githubUsername: 'SrishtiSehtia',
    githubLink: 'https://github.com/SrishtiSehtia/',
    githubProfileImage: 'https://avatars2.githubusercontent.com/u/27976930?s=400&u=64c87f08d8cc96943c16705f8fb15374b34cb48c&v=4',
    personalSiteLink: 'https://github.com/SrishtiSehtia/about-me',
    currentCity: 'San Francisco',
    Hobbies: [{type: 'dancing'}, {type: 'painting'}]
  })
});

// get all projects
app.get('/api/projects', function apiIndex(req, res) {
  // find all projects in db
  db.Project.find(function (err, allProjects) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ projects: allProjects });
    }
  });
});

// get one project
app.get('/api/projects/:id', function (req, res) {
  // get project id from url params (`req.params`)
  var projectId = req.params.id;

  // find project in db by id
  db.Project.findOne({ _id: projectId }, function (err, foundProject) {
    if (err) {
      if (err.name === "CastError") {
        res.status(404).json({ error: "Nothing found by this ID." });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json(foundProject);
    }
  });
});


// create new project
app.post('/api/projects', function apiIndex(req, res) {
  // create new project with form data (`req.body`)
  var newProject = new db.Project(req.body);

  // save new project in db
  newProject.save(function (err, savedProject) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedProject);
    }
  });
});

// delete project
app.delete('/api/projects/:id', function (req, res) {
  // get project id from url params (`req.params`)
  var projectId = req.params.id;

  // find project in db by id and remove
  db.Project.findOneAndRemove({ _id: projectId }, function (err, deletedProject) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedProject);
    }
  });
});

// update projects
app.put('/api/projects/:id', function (req, res) {
  // get projects id from url params (`req.params`)
  var projectsId = req.params.id;

  // find projects in db by id
  db.Project.findOne({ _id: projectsId }, function (err, foundProject) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // update the projectss's attributes
      foundProject.title = req.body.title;
      foundProject.githubLink = req.body.githubLink;
      foundProject.description = req.body.description;

      // save updated projects in db
      foundProject.save(function (err, savedProject) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(savedProject);
        }
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
