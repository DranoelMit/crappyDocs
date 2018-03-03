var socket = io.connect();
var $page = $("#page");

$(window).load(function(){
     socket.emit("get text");
})

$page.keyup(function(){
     socket.emit("new text", $page.val());
});

socket.on("update text", function(txt){
     $page.val(txt);
});
