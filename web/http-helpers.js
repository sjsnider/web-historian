var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helperPath;
exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  res.writeHead(200, headers);
  if(asset === '/index.html' || asset === '/styles.css'){
    helperPath = archive.paths.siteAssets + asset;
  } else if (asset === '/loading.html') {
    res.writeHead(302, headers);
    helperPath = archive.paths.siteAssets + asset;
  } else {
    helperPath = archive.paths.archivedSites + asset;
  }
  fs.readFile(helperPath, function(err, fileData) {
    if (err) throw err;
    console.log(fileData);
    res.end(fileData);
  });
};

// As you progress, keep thinking about what helper functions you can put here!
