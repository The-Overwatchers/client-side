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
    });
    $('#formLogin').on('submit', function(event) {
      event.preventDefault();
      let userName = $('#inputLogin').val();
      app.Users.loginUser(userName);
    });
  };

  loginView.regAlert = alertMsg => {
    let message = {};
    $('#alertMsg').empty();
    message.alert = alertMsg;
    $('#alertMsg').append(app.render('alert-template', message));
  };

  module.loginView = loginView;

})(app);