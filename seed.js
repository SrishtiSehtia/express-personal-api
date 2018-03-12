// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var all_projects = [
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

db.Project.remove({}, function(err, projects) {
  console.log('removed all projects');
  db.Project.create(all_projects, function(err, project){
    if (err){
      return console.log("Error:", err);
    }

    console.log('recreated all projects');
    console.log("created", all_projects.length, "projects");

    // console.log("Created new ", project._id)
    process.exit(); // we're all done! Exit the program.
  });

});
