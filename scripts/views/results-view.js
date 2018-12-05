'use strict'

var app = app || {};

(function(module){
  let resultsView = {};

  resultsView.showResults = context => {
    $('#results').empty();
    app.showOnly('.results');
    context.forEach((singleResult) => {
      $('#results').append(app.render('results-template', singleResult))
    });
  }

  resultsView.showRecommend = context => {
    $('#results').empty();
    app.showOnly('.results');
    context.forEach((singleResult) => {
      $('#results').append(app.render('recommend-template', singleResult))
    });
  }
  module.resultsView = resultsView;
})(app);