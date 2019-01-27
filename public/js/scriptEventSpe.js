
if(window.addEventListener){
    window.addEventListener('load', initEvent, false);
}else{
    window.attachEvent('onload', initEvent);
}

function initEvent(){

    $("#title").prepend($.cookie("eventTitle"));
    $("#description").prepend($.cookie("eventDesc"));
    $("#price").append($.cookie("eventPrice") + "€");
    displayBtn();
}

function displayBtn(){
    if ($.cookie("userRole") == 2){
        var button = "<a href=\'events\'><button id=\'report\' onclick=report()>Signaler</button></a>"
    } else if($.cookie("userRole") == 1){
        var button = "<a href=\'events\'><button id=\'remove\' onclick=Remove()>Annuler</button></a>"
    }else if($.cookie("userRole") == 0){
        var button = "<button id=\'inscrire\' onclick=Inscrire()>S'inscrire à cet événement</button>"
    }
    $("#btnIns").prepend(button);
}

function report(){
    var myJSON = {user:{idEvent: $.cookie("eventId")}}
    console.log(myJSON);
    $.ajax({
        url: 'http://10.131.128.250:3003/removeevent/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
        }
    });
}

function Remove(){
    var myJSON = {user:{idEvent: $.cookie("eventId")}}
    console.log(myJSON);
    $.ajax({
        url: 'http://10.131.128.250:3003/removeevent/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
        }
    });
}

function Inscrire(){
    var myJSON = {user:{idEvent: $.cookie("userId")}}
    console.log(myJSON);
    $.ajax({
        url: 'http://10.131.128.250:3003/inscriptionevent/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
        }
    });
    $("#btnIns").disabled = true;

}