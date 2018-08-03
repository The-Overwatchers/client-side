'use strict';

var app = app || {};

(function(module){
  let favoritesView = {};

  favoritesView.init = context => {
    $('#favoritesView').empty();
    module.showOnly('.favorites');
    app.Games.getFavCovers(app.favoritesView.showCovers);
  };

  favoritesView.showCovers = (coversArray) => {
    coversArray.forEach(cover => {  
      $('#favorites').append(app.render('favorites-template', cover));
    });
    $('.removeFav').on('click', function(event) {
      event.preventDefault();
      let removeFavObj = {
        id: this.getAttribute('data-id'),
        user: localStorage.getItem('id')
      };
      app.Games.removeFav(removeFavObj);
    });
  };


  module.favoritesView = favoritesView;
})(app);