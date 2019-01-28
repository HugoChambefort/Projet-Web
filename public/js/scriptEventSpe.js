if(window.addEventListener){
    window.addEventListener('load', initEvent, false);
}else{
    window.attachEvent('onload', initEvent);
}

function initEvent(){

    $("#title").prepend($.cookie("eventTitle"));
    $("#description").prepend($.cookie("eventDesc"));
    $("#date").prepend($.cookie("eventDate"));
    $("#price").append($.cookie("eventPrice") + "€");
    displayBtn();
    displayImg();
}

function displayBtn(){
    if ($.cookie("userRole") == 2){
        var button = "<a href=\'events\'><button id=\'report\' onclick=report()>Signaler</button></a>"
    } else if($.cookie("userRole") == 1){
        var button = "<a href=\'events\'><button id=\'remove\' onclick=remove()>Annuler l'événement</button></a>"
    }else if($.cookie("userRole") == 0){
        var button = "<button id=\'inscrire\' onclick=inscrire()>S'inscrire à cet événement</button>"
    }
    $("#btnIns").prepend(button);
}

function report(){
    var send = "idEvent=" + $.cookie("eventId")
    $.ajax({
        url: 'http://10.131.128.250:3003/supperevent/',
        method: 'DELETE',
        data: send,
        success:function (data) {
            console.log(data);
        }
    });
}

function remove(){
    var send = "idEvent=" + $.cookie("eventId")
    $.ajax({
        url: 'http://10.131.128.250:3003/supperevent/',
        method: 'DELETE',
        data: send,
        success:function (data) {
            console.log(data);
        }
    });
}

function inscrire(){
    var myJSON = {user:{idUser: $.cookie("userId"), idEvent: $.cookie("eventId")}}
    console.log(myJSON);
    $.ajax({
        url: 'http://10.131.128.250:3003/inscriptionevent/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
        }
    });
}

function displayImg(){
    var send = "idEvent="+ $.cookie("userId")
    $.ajax({
        url: 'http://10.131.128.250:3003/imagesEvent/',
        method: 'GET',
        data: send,
        success:function (data) {
            console.log(data);
            if(data.length){
            }else{
            }
        }
    });
}