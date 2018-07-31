'use strict'

var app = app || {};

(function(module){
  let resultsView = {};

  resultsView.showResults = context => {
    $('#results').empty();
    app.showOnly('#results');
    context.forEach((singleResult) => 
     $('#results').append(app.render('results-template', singleResult))
  );
  }
  module.resultsView = resultsView;
})(app);