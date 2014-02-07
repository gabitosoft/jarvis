exports.createFile = function(options) {

  var fs = require('fs');

  var path = options.directory + options.name;

  fs.writeFile(path, options.text, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
};