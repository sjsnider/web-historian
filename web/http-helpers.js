var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helperPath, statusCode;

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  statusCode = 200;
  if(asset === '/index.html' || asset === '/styles.css') {
    helperPath = archive.paths.siteAssets + asset;
  } else if (asset === '/loading.html') {
    statusCode = 302;
    helperPath = archive.paths.siteAssets + asset;
  } else {
    helperPath = archive.paths.archivedSites + asset;
  }

  fs.readFile(helperPath, function(err, fileData) {
    if (err) {
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(statusCode, headers);
      res.end(fileData);
    }
  });
};
