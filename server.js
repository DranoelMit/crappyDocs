var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var connections =[];
var text ="";

server.listen(process.env.PORT || 8000);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
     res.sendFile(__dirname + "/public/index.html");
});


io.sockets.on("connection", function(socket){
     connections.push(socket);
     console.log("User Connected: " + connections.length + " sockets connected");

//disconnect
     socket.on("disconnect", function(data)
     {
          connections.splice(connections.indexOf(socket), 1);
          console.log("User Disconnected: " +connections.length + " sockets connected");
     });
     socket.on("get text", function(){
          socket.emit("update text", text);
     });
     socket.on("new text", function(newTxt){
          text = newTxt;
          io.sockets.emit("update text", text);
     });

});
