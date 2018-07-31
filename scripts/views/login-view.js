'use strict';

var app = app || {};

(function(module){
  let loginView = {};

  loginView.init = context => {
    $('#inputLogin').empty();
    $('#inputRegister').empty();
    module.showOnly('.login');
  }

  module.loginView = loginView;

})(app);