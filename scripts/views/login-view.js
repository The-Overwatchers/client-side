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

  loginView.userSession = loginInfo => {
    if(!!loginInfo.success) {
      localStorage.setItem('user', null); // logout any former users
      localStorage.setItem('user', loginInfo.myName); // login as new use
      module.indexView.init();
      $('#navLogin').hide();
      $('#navLogout').show();
    } else {
      loginView.regAlert(loginInfo.string);
    }
  };

  loginView.logout = () => {
    localStorage.setItem('user', null);
    $('#navLogin').show();
    module.indexView.init();
  };

  module.loginView = loginView;

})(app);