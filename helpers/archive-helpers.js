var fs = require('fs');
var http = require('http-request');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
// open readFile readDir write

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, 'utf-8',function(err, fileData){
    if (err)
      throw err;
    var urlArray = fileData.split('\n');
    if(cb){
      return cb(urlArray);
    } else {
      return urlArray;
    }
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(urlArray){
    if (cb) {
      cb(urlArray.indexOf(url) !== -1);
    } else {
      return urlArray.indexOf(url) !== -1;
    }
  });
};

exports.addUrlToList = function(url){
  fs.open(exports.paths.list, 'a', function(err, file){
    if (err)
      throw err;
    fs.write(file, url + '\n', undefined, undefined, function(err, data) {
      fs.close(file);
    });
  });
};

exports.isURLArchived = function(url, cb){
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    if (cb) {
      cb(exists);
    } else {
      return exists;
    }
  });
};

exports.downloadUrls = function(url){
  http.get(url, exports.paths.archivedSites + '/' + url, function(err, res) {
    if (err) throw err;
  });
};
