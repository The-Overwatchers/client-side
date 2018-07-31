'use strict';

var app = app || {};

(function(module){
  let loginView = {};

  loginView.init = context => {
    $('#inputLogin').empty();
    $('#inputRegister').empty();
    module.showOnly('.login');
    $('#formRegister').on('submit', function(event) {
      event.preventDefault();
      let newUserName = $('#inputRegister').val();
      app.Users.registerUser(newUserName);
    })
  }

  module.loginView = loginView;

})(app);