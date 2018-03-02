var socket = io.connect();

var $page = $("#page");

$page.keyup(function(){
     socket.emit("new text", $page.val());
});

socket.on("update text", function(txt){
     $page.val(txt);
})
