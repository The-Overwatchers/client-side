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

  // Games.getRecc = (callback) => {
  //   let idsArray = [];
  //   let elementArray = document.getElementsByClassName('removeFav');
  //   console.log(elementArray);
  //   console.log(elementArray[0].getAttribute('data-id'));
  //   for(let i; i < elementArray.length; i++){
  //     idsArray.push(elementArray[i].getAttribute('data-id'));
  //     console.log(elementArray[i].getAttribute('data-id'));
  //   }
  //   console.log(idsArray);
  //   $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/recommend`, idsArray)
  //     .then(result => {
  //       callback(result);
  //     });
  // };

  module.Games = Games;
})(app);