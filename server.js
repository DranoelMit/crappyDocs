var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var connections =[];
/*instead of one string, make an array of lines, where each line has its own string.
This way, we can keep track of the end of each line for up arrow and deleting, the only difference is
calculating lines based on cursor constants (which are not yet responsive), and append all of these lines
with \n's to display them as separate lines in the text area
*/
var numLines = 1;
var lines = [];
updateLines();

//need to keep track of lines, and push lines down when creating a new line in the middle of two lines


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
          socket.emit("hard update text", getFullText());
     });
     socket.on("new char", function(object){
          lines[object.line] = lines[object.line].substring(0,object.offset) +
                              object.char + lines[object.line].substring(object.offset);
          io.sockets.emit("hard update text", getFullText());
     });
     socket.on("rem char", function(object){
          //remove character to the left of the cursor
          if(object.offset >= 0){
               lines[object.line] = lines[object.line].slice(0,object.offset) + lines[object.line].slice(object.offset+1);
          }
          io.sockets.emit("hard update text", getFullText());
     });
     socket.on("new line", function(object){
          let currentTxt = lines[object.line].slice(0, object.offset);
          let newTxt = lines[object.line].slice(object.offset);

          for(i=numLines+1; i>object.line; i--){
               lines[i] = lines[i-1];
          }
          numLines++;
          lines[object.line] = currentTxt;
          lines[object.line+1] = newTxt;
          io.sockets.emit("hard update text", getFullText());
     });
     socket.on("rem line", function(line){
          lines[line-1] += lines[line];
          for(i=line; i<numLines; i++){ //the +1 will take the undefined value from one past the array and use it to overwrire the last line
               lines[i] = lines[i+1];
          }
          numLines--;
          io.sockets.emit("hard update text", getFullText());
     });
     socket.on("get line length", function(line, callback){
          callback(lines[line].length);
     });
     socket.on("get num lines", function(callback){
          callback(numLines);
     });

});

function updateLines(){ //makes all lines blank, really not used rn but can be useful in the future
     for(i=0; i<numLines; i++){
          lines[i]="";
     }
}

function getFullText(){
     var fullText = "";
     for(i=0; i<numLines; i++){
          if(i!==numLines-1)
               fullText+=lines[i]+"\n";
          else
               fullText+=lines[i];
          }
          return fullText;
     }
