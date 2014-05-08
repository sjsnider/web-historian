var fs = require('fs');
var http = require('http-request');
var path = require('path');
var _ = require('underscore');

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf-8',function(err, fileData) {
    if (err) throw err;
    var urlArray = fileData.split('\n');
    return cb(urlArray);
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(urlArray) {
    return cb(urlArray.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url) {
  fs.open(exports.paths.list, 'a', function(err, file) {
    if (err) throw err;
    fs.write(file, url + '\n', undefined, undefined, function(err, data) {
      if (err) throw err;
      fs.close(file);
    });
  });
};

exports.isURLArchived = function(url, cb) {
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    return cb(exists);
  });
};

exports.downloadUrls = function(url) {
  http.get(url, exports.paths.archivedSites + '/' + url, function(err, res) {
    if (err) throw err;
  });
};
