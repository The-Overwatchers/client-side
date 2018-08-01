'use strict';

var app = app || {};

(function(module){

  let indexView = {};

  indexView.init = () => {
    //This needs to match the id of the form
    app.showOnly('.landing');
    $('#navLogout').hide();
    $('#search-bar').on('submit', (function (event) {
      event.preventDefault();
      let requestedGame = $('#search-input').val();
      app.Games.fetchResults(requestedGame, app.resultsView.showResults);
    }))
    console.log('hello!')
  }


module.indexView = indexView;
})(app);