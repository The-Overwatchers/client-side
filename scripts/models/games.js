'use strict'

var app = app || {};

(function(module){
  let Games = {};

  Games.fetchResults = (context, callback) =>{
    context.replace(/\s/g,'-');
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/games/${context}`)
      .then(result => callback(result))
      .catch(error => console.error(error));
  }

  Games.favOneGame = (context, callback) => {
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/favorites/`, {
      name: context.name,
      igdb_id: context.id,
      user: context.user
    })
      .then(result => callback(result))
      .catch(error => console.error(error));
  }

  module.Games = Games;
})(app);