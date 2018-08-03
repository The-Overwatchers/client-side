'use strict';

var app = app || {};

(function(module){
  let Games = {};

  Games.fetchResults = (context, callback) =>{
    context.replace(/\s/g,'-');
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/games/${context}`)
      .then(result => callback(result))
      .catch(error => console.error(error));
  };

  Games.favOneGame = (context, callback) => {
    let favObject = {
      name: context.name,
      user: context.user,
      igdb_id: context.igdb_id
    };
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/favorite`, favObject)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  Games.getFavCovers = (callback) => {
    let user = {};
    user.id = localStorage.getItem('id');
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/favorite/${user.id}`)
      .then(result => {
        callback(result);
      });
  };

  Games.removeFav = (gameUserIds) => {
    $.ajax({
      method: "DELETE",
      url: `${app.ENVIRONMENT.apiUrl}/api/v1/favorite/delete`,
      data: gameUserIds
    })
      .then(result => {
        // console.log(result);
        app.favoritesView.init();
      });
  };
  module.Games = Games;
})(app);