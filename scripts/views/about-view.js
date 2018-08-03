'use strict';

var app = app || {};

(function(module){
  let aboutView = {};

  aboutView.init = () => {
    app.showOnly('.about');
  };

  module.aboutView = aboutView;
})(app);