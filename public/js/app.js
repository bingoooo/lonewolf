console.log('app.js');

var character = {
    endurance: 0,
    hability: 0
}

$.get("/getLevels", function(data){
    console.log('is there a response from the server ?');
    console.log(data);  
});

console.log('reached end of file');