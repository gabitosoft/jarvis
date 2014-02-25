'use strict'
var fs = require('fs');
var path = require('path');

module.exports = function(app) {
  fs.readdirSync('./routes').forEach(function(file){
    //Avoid to read this file
    if ( file === path.basename(___filename)) { return; }

    // Load the route file
    require('./' + file)(app);
  });
}