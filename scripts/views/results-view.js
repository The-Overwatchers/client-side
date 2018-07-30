'use strict'

var app = app || {};

(function(module){
  let resultsView = {};

  resultsView.showResults = context => {
    context.forEach((singleResult) => 
      app.render('results-template', singleResult)
  );
  }
  
})(app);