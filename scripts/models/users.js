'use strict';

var app = app || {};

(function(module){
  let Users = {};

  Users.registerUser = (newName) => {
   $.get('/api/v1/user/register', newName)
    .then(results => console.log(results)) // TODO: call login function
    .catch(error => console.error(error));
  };

  Users.loginUser = (userName) => {
    $.get('/api/v1/user/login', userName)
      .then() // append username to local storage
      .catch(error => console.error(error));
  };
  
  module.Users = Users;
})(app);