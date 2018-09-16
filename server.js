var http = require("http"),
    express = require("express"),
    path = require("path"),
    fs = require("fs");


function start() {
    var app = express();

    var htmlPath = path.join(__dirname, 'html');

    app.use(express.static(htmlPath));

    app.get("/", function(request, response){

        response.sendFile(__dirname + "/html/specks.html");
    });

    app.listen(3030);
}


exports.start = start;