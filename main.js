// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var urlLocalhost = getIPAdress();
var port = 3000;
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.use(express.static(__dirname + '/src'));

io.sockets.on('connection',function(socket){

    socket.on('login',function(clientId){
        if(users.indexOf(clientId) > -1){
            socket.emit('nickExisted');
        }else{
            socket.clientId = clientId;
            users.push(clientId);
            socket.emit('loginSuccess',clientId);
            io.sockets.emit('system', clientId, users.length, 'login');
        }
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.clientId != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.clientId), 1);
            // socket.broadcast.emit('system', socket.clientId, users.length, 'logout');
            socket.broadcast.emit('loginOut',users);
        }
    });

    socket.on('mshake', function(msg){
        io.emit('ballPosition', msg);
        console.log(msg)
    });

    socket.on('myColor', function(msg){
        io.emit('ballColor', msg);
    });
});

http.listen(port, urlLocalhost);
console.log(urlLocalhost + ":" + port);

function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                  return alias.address;  
               }  
          }  
    }  
}