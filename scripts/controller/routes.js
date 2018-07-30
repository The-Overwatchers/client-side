'use strict'


page('/', ctx => app.indexView.init(ctx));
// --------------------------------------------

// Vinicio - this line has to be placed at the end of the file, AFTER you define any front-end routes
page(); // Vinicio - this line is starting the Page JS Engine
