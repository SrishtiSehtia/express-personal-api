// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var projects = [
  {
    title: "DevelopMe",
    githubLink: "https://github.com/SrishtiSehtia/develop_me",
    description: "Builds a developer community by connecting mentors and mentees via a Q&A web forum"
  }
  ,
  {
    title: "GeoQuakes",
    githubLink: "https://github.com/SrishtiSehtia/geoquakes",
    description: "Shows earthquake data by location"
  }
  ,
  {
    title: "Trivia Game",
    githubLink: "https://github.com/SrishtiSehtia/trivia-game",
    description: "Terminal trivia game"
  }
]
db.Project.create(projects, function(err, projects){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new projects:", projects)
  process.exit(); // we're all done! Exit the program.
})
