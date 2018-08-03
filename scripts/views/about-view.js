'use strict';

var app = app || {};

(function(module){
  let aboutView = {};

  aboutView.init = () => {
    $('.login-link').hide();
    app.showOnly('.about');
  };

  module.aboutView = aboutView;
})(app);