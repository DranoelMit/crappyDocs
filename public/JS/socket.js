var socket = io.connect();
var $page = $("#page");
var $document = $(document);

$(window).load(function(){
     socket.emit("get text");
});

$document.keypress(function(e){
     console.log(e.keyCode);
     if(e.keyCode === 8)//backspace
          socket.emit("rem char");
     else
          socket.emit("new char",String.fromCharCode(e.keyCode));
});

socket.on("soft update text", function(char){
     $page.val($page.val()+char);
});
socket.on("hard update text", function(txt){
     $page.val(txt);
});
