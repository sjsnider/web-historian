var path = require('path');
var urlParser = require('url');
var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
//
// var actions = {
//   'GET': getMessages,
//   'POST': post

// };

exports.handleRequest = function (req, res) {
  // console.log(urlParser.parse(req.url));
  var pathname = urlParser.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (pathname === '/' || pathname === '/index.html') {
      pathname = '/index.html';
      helpers.serveAssets(res, pathname);
    } else if (pathname === '/styles.css') {
      helpers.serveAssets(res, pathname);
    } else {
      archive.isURLArchived(pathname, function(isArchived){
        if(isArchived){
          helpers.serveAssets(res, pathname);
        } else {
          res.writeHead(404, helpers.headers);
          res.end();
        }
      });
    }
  } else if(req.method === 'POST'){
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      pathname = body.split('=')[1];
      archive.isUrlInList(pathname, function(inList) {
      console.log(inList);
      if (inList) {
        // see if its archived w/
        archive.isURLArchived(pathname, function(isArchived){
          console.log(isArchived);
          if (isArchived){
            // take pathname and redirect to it
            helpers.serveAssets(res, '/' + pathname);
          } else {
            // redirect to loading
            helpers.serveAssets(res, '/loading.html');
          }
        });
      } else {
        // call addtolist, redirect to loading.html
          archive.addUrlToList(pathname);
          helpers.serveAssets(res, '/loading.html');
      }
    });
    });


  }

  //res.end(archive.paths.list);
};
