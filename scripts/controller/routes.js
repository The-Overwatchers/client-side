'use strict';

// if(window.location.pathname !== '/'){
//   page.base('/client-side');
// }
page('/', ctx => app.indexView.init(ctx));
page('/games/:id', ctx => app.detailsView.init(ctx));
page('/login', ctx => app.loginView.init(ctx));
page('/logout', ctx => app.loginView.logout(ctx));
page('/favorites', ctx => app.favoritesView.init(ctx));
page('/about', ctx => app.aboutView.init(ctx));


// Vinicio - this line has to be placed at the end of the file, AFTER you define any front-end routes
page(); // Vinicio - this line is starting the Page JS Engine
