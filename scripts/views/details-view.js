'use strict'

var app = app || {};

(function(module){
  let detailsView = {};

  detailsView.init = (ctx) =>{
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/game-description/${ctx.params.id}`)
    .then(result => detailsView.showDetails(result))
  }
  detailsView.showDetails = context => {
    $('#details').empty();
    app.showOnly('#details');
    context[0].cover_url = context[0].cover.url;
    $('#details').append(app.render('details-template', context[0]))
  }
  module.detailsView = detailsView;
})(app);