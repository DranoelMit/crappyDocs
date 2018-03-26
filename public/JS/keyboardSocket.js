var socket = io.connect();
var $page = $("#page");
var $document = $(document);

/* Tab, Space, backSpace, control, right, left, up, down */
const SPECIAL_KEYS =[9, 32, 8, 17, 13, 39, 37, 38, 40];

$(window).load(function(){
     socket.emit("get text");
     updateCursor(0,0);
     updateNumLines();
});
$document.keydown(function(e){
     if(SPECIAL_KEYS.includes(e.keyCode)){
          e.preventDefault();
          if(e.keyCode == 32){
               //socket.emit("new char"," ");
               sendNewChar(" ");
               updateCursor(1,0);
          }
          else if(e.keyCode == 9){
                    // socket.emit("new char", "       ");
               sendNewChar("       ");
               updateCursor(7,0);
          }
          else if(e.keyCode == 13){ //enter
               //socket.emit("new char", "\n");
               socket.emit("new line", {line:lineNum, offset:lineOffset});
               updateCursor(0,1);
               updateNumLines();

          }
          else if(e.keyCode == 39){ //right
               if(lineOffset<currentLineLength)
                    updateCursor(1,0);
          }
          else if(e.keyCode == 37){ // left
                    updateCursor(-1,0);
                    updateLineLength(lineNum);    

          }
          else if(e.keyCode == 38){ //up
               if(lineNum>0){
                    updateCursor(0, -1);
                    updateLineLength(lineNum);
               }
          }
          else if(e.keyCode == 40){ //down
               if(lineNum<currentNumLines-1){
               updateCursor(0, 1);
               updateLineLength(lineNum);
               }
          }

     }

     if(e.keyCode == 8){ //backspace
          if(lineOffset == 0 && lineNum != 0){
               console.log("booped line");
               socket.emit("rem line", lineNum);
          }
          else
               socket.emit("rem char", {offset: lineOffset-1, line: lineNum});

          updateCursor(-1,0);
          updateNumLines();
          updateLineLength(lineNum);
     }

});
$document.keypress(function(e){
     e.preventDefault();
     sendNewChar(String.fromCharCode(e.keyCode));
     updateCursor(1,0);
     updateLineLength(lineNum);
});

socket.on("soft update text", function(char){
     $page.val($page.val()+char);
});
socket.on("hard update text", function(txt){
     $page.val(txt);
});

function sendNewChar(char){
     socket.emit("new char", {char: char, line: lineNum, offset: lineOffset});
}
function updateLineLength(line){
     socket.emit("get line length", line, function(length){
          currentLineLength = length;
          if(lineOffset>currentLineLength){
               lineOffset=currentLineLength;
               updateCursor(0,0);
          }
     });
}
function updateNumLines(){
     socket.emit("get num lines", function(numLines){
          currentNumLines = numLines;
          if(lineNum> currentNumLines){
               lineNum=numLines;
               updateLineLength(lineNum);
          }
     });
}
