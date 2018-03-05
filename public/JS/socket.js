var socket = io.connect();
var $page = $("#page");
var $document = $(document);
/* Tab, Space, backSpace, control */
const SPECIAL_KEYS =[9, 32, 8, 17];

$(window).load(function(){
     socket.emit("get text");
});
$document.keydown(function(e){
     if(SPECIAL_KEYS.includes(e.keyCode)){
          e.preventDefault();
     if(e.keyCode == 32)
          socket.emit("new char"," ");
     else if(e.keyCode == 9)
          socket.emit("new char", "\t");
     }

     if(e.keyCode == 8) //backspace
          socket.emit("rem char");

});
$document.keypress(function(e){
     e.preventDefault();
     socket.emit("new char",String.fromCharCode(e.keyCode));
});

socket.on("soft update text", function(char){
     $page.val($page.val()+char);
});
socket.on("hard update text", function(txt){
     $page.val(txt);
});
