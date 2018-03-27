const PAGE_X= 12;
const PAGE_Y = 4.25;
const LINE_WIDTH = 1320;
const LINE_HEIGHT = 1.5;
const CHAR_WIDTH = .55;

const MCPL= 143; //max characters per line
var lineOffset = 0; //how many characters in the cursor is
var lineNum = 0;

var currentLineLength =0;
var currentNumLines =1;
var $cursor = $("#cursor");
//
// var cursorPos = {
//      x: PAGE_X,
//      y: PAGE_Y
// };
/*
xRate and yRate should go straight to lineNum and lineOffset,
from there those values should be used to calculate cursorPos. NOT the other way around
TODO: turn everything to rem, and re adjust calculations
*/
function updateCursor(xRate, yRate){
     if(xRate==-1 && lineOffset==0){
          if(lineNum>0){
               lineNum--;
               updateLineLength(lineNum);
               lineOffset=currentLineLength;
          }
          //need some way to get length of aboce line and set cursor to the length of that line
     }
     else if(xRate!=0 && lineOffset==MCPL){
          socket.emit("new line", {line:lineNum, offset:lineOffset});
          lineOffset=1;
          lineNum++;
          updateNumLines();
     }
     else{
          lineOffset+= xRate;
          lineNum+= yRate;
     }

     $cursor.css("left", (PAGE_X+lineOffset*CHAR_WIDTH)+"rem");
     $cursor.css("top", (PAGE_Y+lineNum*LINE_HEIGHT)+"rem");

     console.log("line# "+lineNum+"  offset# "+lineOffset);
}
