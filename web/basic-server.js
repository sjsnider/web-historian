var http = require("http");
var time = require("time");
var handler = require("./request-handler");
var CronJob = require('cron').CronJob;
var fetcher = require('../workers/htmlfetcher');

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
new CronJob('* */1 * * * *', function() {
  fetcher.htmlFetcher();
}, null, true, 'America/Los_Angeles');
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
