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
      publishers: context.publishers,
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
        recomm.publishers = [];
        result.forEach(element => {
          recomm.themes.push(element.themes);
          recomm.genres.push(element.genres);
          recomm.publishers.push(element.publishers);
        });
        
        let commonGenre = app.Games.getModeOfFavs(recomm.genres);
        let commonTheme = app.Games.getModeOfFavs(recomm.themes);
        let commonPublisher = app.Games.getModeOfFavs(recomm.publishers);
        let commonIds = {genre: commonGenre, theme: commonTheme, publisher: commonPublisher};
        $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/recommend`, commonIds)
          .then(result => {
            callback(result);})
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  Games.getModeOfFavs = (category) => {
    // This functionality can likely be simplified. I was unable to get around the scoping
    // associated with aggregating the object/dictionary. Since some of the categories coming in are
    // integers, and some are arrays, I had to put in this gross if/else statment. 

    let commonCategoryObj = {};
    let commonCategoryNum = 0;
    let commonCategory = 0;
    category.forEach(element => {
      if(Number.isInteger(element)) {
        console.log(element)
        if(commonCategoryObj[element] == null){
          commonCategoryObj[element] = 1;
        }else{
          commonCategoryObj[element]++;
        }
        if(commonCategoryObj[element] > commonCategoryNum){
          commonCategoryNum = commonCategoryObj[element];
          commonCategory = element;}
      }else if(element !== null && element !== undefined){
        let categoryIds = element.split(',')
        categoryIds.forEach(category => {
          if(!isNaN(category)){
            if(commonCategoryObj[category] == null){
              commonCategoryObj[category] = 1;
            }else{
              commonCategoryObj[category]++;
            }
            if(commonCategoryObj[category] > commonCategoryNum){
              commonCategoryNum = commonCategoryObj[category];
              commonCategory = category;
            };
          }
        });
      }
    });
    return commonCategory;
  };

  module.Games = Games;
})(app);