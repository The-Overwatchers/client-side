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
    if(!!loginInfo.success) { // eslint-disable-line
      localStorage.setItem('user', null); // logout any former users
      localStorage.setItem('user', loginInfo.myName);
      localStorage.setItem('id', null);
      localStorage.setItem('id', loginInfo.userId);
      $('#navLogout').hide();// login as new use
      module.indexView.init();
      $('#navLogin').hide();
      $('#navLogout').show();
    } else {
      loginView.regAlert(loginInfo.string);
    }
  };

  loginView.loginPersist = () => {
    $('#navLogin').hide();
    $('#navLogout').show();
  };

  loginView.logout = () => {
    localStorage.setItem('user', null);
    localStorage.setItem('id', null);
    $('#navLogin').show();
    module.indexView.init();
  };

  module.loginView = loginView;

})(app);