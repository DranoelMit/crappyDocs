const PAGE_X= 170;
const PAGE_Y = 55;
const LINE_WIDTH = 1320;
const LINE_HEIGHT = 23.5;
const CHAR_WIDTH = 8.81;

const MCPL= 150; //max characters per line
var lineNum = 0;
var lineOffset = 0; //how many characters in the cursor is

var $cursor = $("#cursor");

var cursorPos = {
     x: PAGE_X,
     y: PAGE_Y
};

function updateCursor(xRate, yRate){
     if(xRate !=0 && yRate ==0){
          cursorPos.x += xRate*CHAR_WIDTH;

          if(cursorPos.x < PAGE_X){
               if(cursorPos.y > PAGE_Y)
                    cursorPos.x = PAGE_X+LINE_WIDTH-CHAR_WIDTH;
               else
                    cursorPos.x = PAGE_X;
               cursorPos.y -= LINE_HEIGHT;
               if(cursorPos.y < PAGE_Y){
                    cursorPos.y = PAGE_Y;
               }
          }
          else if(cursorPos.x >= LINE_WIDTH+PAGE_X)
          {
               cursorPos.x = PAGE_X;
               cursorPos.y += LINE_HEIGHT;
          }
     }
     else if(xRate == 0 && yRate != 0){
          cursorPos.y += yRate*LINE_HEIGHT;
          if(cursorPos.y < PAGE_Y){
               cursorPos.y = PAGE_Y;
          }
     }
     $cursor.css("top", cursorPos.y+"px");
     $cursor.css("left", cursorPos.x+"px");

     lineNum = (cursorPos.y-PAGE_Y)/LINE_HEIGHT;
     lineOffset = Math.floor((cursorPos.x-PAGE_X)/CHAR_WIDTH);
     console.log("line# "+lineNum+"  offset# "+lineOffset);
}
