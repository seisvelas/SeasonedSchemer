/*var request = require("request");
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();


request("https://api.stackexchange.com/2.2/search?site=stackoverflow&tagged=racket&intitle=" + process.argv[1], function(error, response, data) {
    body.data = data;
    body.emit('update');
});

body.on('update', function () {
    console.log(body.data); // HOORAY! THIS WORKS!
});*/
var http = require("http"),
    zlib = require("zlib");

function getGzipped(url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];

    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join("")); 

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

getGzipped("http://api.stackexchange.com/2.2/search?site=stackoverflow&tagged=racket&intitle=" + process.argv[2], function(err, data) {
   console.log(JSON.parse(data));
});
