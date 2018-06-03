var http = require("http"),
    express = require("express"),
    path = require("path"),
    fs = require("fs");


function start() {
    var app = express();

    var htmlPath = path.join(__dirname, 'html');

    app.use(express.static(htmlPath));

    app.listen(1986);
}


exports.start = start;