'use strict';

var app = app || {};

(function(module){

  let indexView = {};

  indexView.init = () => {
    //This needs to match the id of the form
    app.showOnly('.landing');
<<<<<<< HEAD
    if()
=======
    $('#navLogout').hide();
>>>>>>> ba38acf96990c76d9b5e89e27425cce88b3b779d
    $('#search-bar').on('submit', (function (event) {
      event.preventDefault();
      let requestedGame = $('#search-input').val();
      app.Games.fetchResults(requestedGame, app.resultsView.showResults);
    }))
    console.log('hello!')
  }


module.indexView = indexView;
})(app);