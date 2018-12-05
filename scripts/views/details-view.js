'use strict';

var app = app || {};

(function(module){
  let detailsView = {};

  detailsView.init = (ctx) =>{
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/game-description/${ctx.params.id}`)
      .then(result => detailsView.showDetails(result));
  };

  detailsView.showDetails = context => {
    $('#details').empty();
    app.showOnly('.details');
    context[0].cover_url = context[0].cover.url;
    $('#details').append(app.render('details-template', context[0]));
    $('#favGameId').on('click', function (event) {
      event.preventDefault();
      console.log(context)
      let newFavGame = {};
      newFavGame.name = $('#favGameName').text();
      newFavGame.igdb_id = $('#favGameId').data('id');
      newFavGame.themes = $('#favGameId').data('theme');
      newFavGame.genres = $('#favGameId').data('genre');
      newFavGame.user = localStorage.getItem('user');
      app.Games.favOneGame(newFavGame);
    })
    if(localStorage.getItem('user') === 'null') {
      $('#favGameId').hide();
    }
  };

  module.detailsView = detailsView;
})(app);