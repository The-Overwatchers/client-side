'use strict';

var app = app || {};

(function(module){
  let Users = {};

  Users.registerUser = (newName) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/user/register/${newName}`)
      .then(results => {
        if(!!results.success) { // eslint-disable-line
          return app.loginView.regAlert(results.string);
        } else {
          return app.loginView.regAlert(results.string);
        }
      })
      .catch(error => console.error(error));
  };

  Users.loginUser = (userName) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/user/login/${userName}`)
      .then(result => app.loginView.userSession(result)) // append username to local storage
      .catch(error => console.error(error));
  };

  module.Users = Users;
})(app);