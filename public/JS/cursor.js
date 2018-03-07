const PAGE_X= 170;
const PAGE_Y = 55;
const LINE_WIDTH = 1320;
const LINE_HEIGHT = 23.5;
const CHAR_WIDTH = 8.81;

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
     console.log("x: "+cursorPos.x+", y: "+cursorPos.y);
}
