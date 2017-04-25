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

if(debug){
    db.each("SELECT rowid as id, * FROM levels", function(error, row){
        console.log(row);
    });
    db.each("SELECT rowid as id, * FROM kai_disciplines", function(error, row){
        console.log(row);
    });
    db.each("SELECT rowid as id, * FROM weapons", function(error, row){
        console.log(row);
    });
}
var sendError = function(message, code){
    if(code === undefined){
        code = 404;
    }
    res.writeHead(code, {'Content-Type':'text/html'});
    res.end(message);
}
var assets = function(request, response){
    var content = "";
    var type = "";
    var normalCall = true;
    if(request.url === '/'){
        content = fs.readFileSync('./index.html');
        type = 'text/html';
    } else if (request.url === '/css/style.css'){
        content = fs.readFileSync('./css/style.css');
        type = 'text/css';
    } else if (request.url === "/js/app.js"){
        content = fs.readFileSync('./js/app.js');
        type = 'text/javascript';
    } else if (request.url === "/js/jquery.js"){
        content = fs.readFileSync('./js/jquery.js');
        type = 'text/javascript';
    } else if (request.url === '/getLevels'){
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
    if(normalCall){
        response.writeHead(200, {'Content-Type': type});
        response.end(content + '\n');
    }
};

var app = http.createServer(assets).listen(port, host);
console.log('Listening on', host, ':', port);