'use strict';

if(window.location.pathname !== '/'){
  page.base('/client-side');
}
page('client-side/', ctx => app.indexView.init(ctx));
page('client-side/games/:id', ctx => app.detailsView.init(ctx));
page('client-side/login', ctx => app.loginView.init(ctx));
page('client-side/logout', ctx => app.loginView.logout(ctx));
page('client-side/favorites', ctx => app.favoritesView.init(ctx));
page('client-side/about', ctx => app.aboutView.init(ctx));


// Vinicio - this line has to be placed at the end of the file, AFTER you define any front-end routes
page(); // Vinicio - this line is starting the Page JS Engine
