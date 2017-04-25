console.log('app.js');

$.get("/getLevels", function(data){
    console.log('is there a response from the server ?');
    console.log(data);  
});

console.log('reached end of file');