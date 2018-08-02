'use strict';

var app = app || {};

(function(module){

  let indexView = {};

  indexView.init = () => {
    //This needs to match the id of the form
    app.showOnly('.landing');
    let userPersist = localStorage.getItem('user');

    if(userPersist !== 'null') { // eslint-disable-line
      app.loginView.loginPersist();
    } else {
      $('#navLogout').hide();
    }
    $('#search-bar').on('submit', (function (event) {
      event.preventDefault();
      let requestedGame = $('#search-input').val();
      app.Games.fetchResults(requestedGame, app.resultsView.showResults);
    }));
  };


module.indexView = indexView;
})(app);