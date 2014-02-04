var express = require("express");
var app = express();
var port = 8000;
var io = require('socket.io').listen(app.listen(port));

// statically fetching public files
app.use (express.static ('./public'));

// routing
app.get('/', function(request, response){
    response.sendfile('public/login.html');
});


userData = {};

// socket connection
io.sockets.on('connection', function(socket){
    console.log('someone just got connected to our server');
    
    socket.on('newUser', function(username){
        userData[username] = {'health': 100, 'mana': 100};
        socket.emit('userCreated', userData);
        console.log(userData);
    });
   
    
});