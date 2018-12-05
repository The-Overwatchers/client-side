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
      igdb_id: context.igdb_id,
      themes: context.themes,
      genres: context.genres,
    };
    console.log(favObject)
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/favorite`, favObject)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  Games.getFavCovers = (callback) => {
    let user = {};
    user.id = localStorage.getItem('id');
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/favorite/${user.id}`)
      .then(result => {
        let bool = {}
        if(result.length > 4){
          bool.moreThanFour = true;
        } else{
          bool.moreThanFour = false;
        };
        callback(result, bool);
      });
  };

  Games.removeFav = (gameUserIds) => {
    $.ajax({
      method: "DELETE",
      url: `${app.ENVIRONMENT.apiUrl}/api/v1/favorite/delete`,
      data: gameUserIds
    })
      .then(result => {
        app.favoritesView.init();
      });
  };

  Games.getRecc = (callback) => {
    let user = {};
    user.id = localStorage.getItem('id');
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/recommend/${user.id}`)
      .then(result => {
        let recomm = {};
        recomm.themes = [];
        recomm.genres = [];
        result.forEach(element => {
          recomm.themes.push(element.themes)
          recomm.genres.push(element.genres)
        });
        let commonGenre = app.Games.getModeOfFavs(recomm.genres)
        let commonTheme = app.Games.getModeOfFavs(recomm.themes)
        let commonIds = {genre: commonGenre, theme: commonTheme}
        $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/recommend`, commonIds)
          .then(result => {callback(result);})
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  Games.getModeOfFavs = (category) => {
    let commonCategoryObj = {};
    let commonCategoryNum = 0;
    let commonCategory = 0;
    category.forEach(element => {
      let categoryIds = element.split(',')
      categoryIds.forEach(category => {
        if(commonCategoryObj[category] == null){
          commonCategoryObj[category] = 1;
        }else{
          commonCategoryObj[category]++;
        }
        if(commonCategoryObj[category] > commonCategoryNum){
          commonCategoryNum = commonCategoryObj[category];
          commonCategory = category;
        };
      });
    });
    return commonCategory;
  };

  module.Games = Games;
})(app);