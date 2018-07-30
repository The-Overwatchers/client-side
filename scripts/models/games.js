'use strict'

var app = app || {};

(function(module){
  let Games = {};

  Games.fetchResults = (context, callback) =>{
    $.get(`/api/v1/games/${context}`)
      .then(results => context.games = results)
      .then(callback(context))
      .catch(errorCallback);
  }


  module.Games = Games;
})(app);