'use strict';

var app = app || {};

(function(module){
  let favoritesView = {};

  // Initialize Favorites Page
  favoritesView.init = context => {
    $('.login-link').hide();
    $('#favorites').empty();
    module.showOnly('.favorites');
    app.Games.getFavCovers(app.favoritesView.showCovers);
    $('#showRecc').on('click', function(event) {
      event.preventDefault();
      favoritesView.reccInit();
    });
  };

  // Display Favorites
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

  // // Generate Recommendations
  // favoritesView.reccInit = context => {
  //   $('#reccView').empty();
  //   app.showOnly('.recc');
  //   app.Games.getRecc(favoritesView.showRecc);
  //   $('#showFav').on('click', function(event) {
  //     event.preventDefault();
  //     favoritesView.init();
  //   })
  // };

  // // Initialize Favorites
  // favoritesView.showRecc = (recGames) => {
  //   // still in progres...
  // };

  module.favoritesView = favoritesView;
})(app);