console.log('Main pogram');

var debug = false;
var sqlite3 = require('sqlite3').verbose();
var http = require('http');
var fs = require('fs');
var path = require('path');

var db = new sqlite3.Database('lonewolf.db');

var files = {};
var port = 9000;
var host = '127.0.0.1';

var assets = function(request, response){
    var content = "";
    var type = "";
    var normalCall = true;
    if(request.url === '/'){
        content = fs.readFileSync('./index.html');
        type = 'text/html';
    }
    else if (request.url === '/getLevels'){
        normalCall = false;
        type = 'application/json';
        db.all("SELECT rowid as id, * FROM levels", (error, rows)=>{
            console.log(rows);
            content = JSON.stringify(rows);
            type = 'application/json';
            response.writeHead(200, {"Content-Type": type});
            response.end(content + "\n");
        });
    }
    else {
        if(fs.existsSync("./public" + request.url)){
            content = fs.readFileSync("./public" + request.url);
            if(request.url.match(/.js/)) type = "text/javascript";
            if(request.url.match(/.css/)) type = "text/css";
            if(type == "") type = 'text/plain';
        } else {
            content = '{error: "No such file in directory"}';
            type = "application/json";
        }
    }
    if(normalCall){
        response.writeHead(200, {'Content-Type': type});
        response.end(content + '\n');
    }
};

var app = http.createServer(assets).listen(port, host);
console.log('Listening on', host, ':', port);