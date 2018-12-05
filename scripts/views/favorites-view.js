'use strict';

var app = app || {};

(function(module){
  let favoritesView = {};

  // Initialize Favorites Page
  favoritesView.init = context => {
    $('.login-link').hide();
    $('#favorites').empty();
    module.showOnly('.favorites');
    $('#recommend-button').hide()
    app.Games.getFavCovers(app.favoritesView.showCovers);
    $('#recommend-button').on('click', function(event) {
      event.preventDefault();
      favoritesView.reccInit();
    });
  };

  // Display Favorites
  favoritesView.showCovers = (coversArray, favThreshold) => {
    if(favThreshold.moreThanFour != false){
      $('#recommend-button').show()
    }
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

  // Initializes Reccommend Feature
  favoritesView.reccInit = context => {
    $('#reccView').empty();
    app.showOnly('.recc');
    app.Games.getRecc(app.resultsView.showRecommend);
    $('#showFav').on('click', function(event) {
      event.preventDefault();
      favoritesView.init();
    })
  };

  module.favoritesView = favoritesView;
})(app);