console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var allProjects = [];

  // form to create new project
  var $createProject = $('#create-project');

  // listen for submit even on form
  $createProject.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newProject = $(this).serialize();

    // POST request to create new project
    $.ajax({
      method: "POST",
      url: '/api/projects',
      data: newProject,

      success: function onCreateSuccess(json) {
        console.log(json);

      }
    });

    // reset the form
    $createProject[0].reset();
    $createProject.find('input').first().focus();
  });

});
