// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');

var htmlFetcher = function() {
  archive.readListOfUrls(function(urlList) {
    for (var i = 0; i < urlList.length; i++) {
      (function(url) {
        archive.isURLArchived(url, function(isArchived) {
          if (!isArchived) {
            console.log(url);
            archive.downloadUrls(url);
          }
        });
      })(urlList[i]);
    }
  });

};

exports.htmlFetcher = htmlFetcher;
