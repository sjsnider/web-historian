var path = require('path');
var urlParser = require('url');
var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');

exports.handleRequest = function (req, res) {
  var pathname = urlParser.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (pathname === '/') {
      pathname = '/index.html';
    }

    helpers.serveAssets(res, pathname);
  } else if (req.method === 'POST') {
    var body = '';

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      pathname = body.split('=')[1];
      archive.isUrlInList(pathname, function(inList) {
        if (inList) {
          archive.isURLArchived(pathname, function(isArchived) {
            if (isArchived) {
              helpers.serveAssets(res, '/' + pathname);
            } else {
              helpers.serveAssets(res, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(pathname);
          helpers.serveAssets(res, '/loading.html');
        }
      });
    });
  }
};
