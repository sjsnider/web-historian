var archive = require('../helpers/archive-helpers');

var htmlFetcher = function() {
  archive.readListOfUrls(function(urlList) {
    for (var i = 0; i < urlList.length; i++) {
      (function(url) {
        archive.isURLArchived(url, function(isArchived) {
          if (!isArchived) archive.downloadUrls(url);
        });
      })(urlList[i]);
    }
  });
};

exports.htmlFetcher = htmlFetcher;
