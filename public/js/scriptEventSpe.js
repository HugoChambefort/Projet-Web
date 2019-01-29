if(window.addEventListener){
    window.addEventListener('load', initEvent, false);
}else{
    window.attachEvent('onload', initEvent);
}

function initEvent(){
    /**
     * display event info
     */

    $("#title").prepend($.cookie("eventTitle"));
    $("#description").prepend($.cookie("eventDesc"));
    $("#date").prepend($.cookie("eventDate"));
    $("#price").append($.cookie("eventPrice") + "€");
    displayBtn();
    displayImg();
}

function displayBtn(){
    /**
     * shoose button
     */
    var buttonRemove= "";
    var button = "";
    if ($.cookie("userRole") == 2){
        buttonRemove = "<button id=\'report\' onclick=report()>Signaler</button>"
    } else if($.cookie("userRole") == 1){
        buttonRemove = "<button id=\'remove\' onclick=remove()>Annuler l'événement</button><br><br>"
        button = "<button id='csv' onclick=\"download_csv()\">Télécharger la liste des inscrits</button><br>"
    }else if($.cookie("userRole") == 0){
        button = "<button id=\'inscrire\' onclick=inscrire()>S'inscrire à cet événement</button>"
    }
    $("#btnremove").prepend(buttonRemove);
    $("#btnIns").prepend(button);

}

function report(){
    /**
     * remove the event from the BDD
     */
    var send = "idEvent=" + $.cookie("eventId")
    $.ajax({
        url: 'http://10.131.128.250:3003/supperevent/',
        method: 'DELETE',
        data: send,
        success:function (data) {
            console.log(data);
            var link = "mailto:bde.cesi@cesi.fr?cc=&subject=Ajout d'événement&body=Bonjour, la direction vous signal que l'événement "+ $.cookie("eventTitle")+ "qui aura lieu le "+$.cookie("eventDate")+" peut nuire a l'image de l'école.";
            window.location.href = link;
        }
    });
}

function remove(){
    /**
     * remove the event from the BDD
     */
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
    /**
     * add an inscription to the BDD
     */
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

function download_csv() {
    console.log($.cookie("eventId"));
    var inscription = [[]];
    var send = "idEvent="+ $.cookie("eventId")
    $.ajax({
        url: 'http://10.131.128.250:3003/listinscrit/',
        method: 'GET',
        data: send,
        success:function (data) {
            console.log(data);
            if(data.length){
                for(var i = 0; i < data.length; i++) {
                    inscription.push([]);
                    inscription[i][0] = data[i]['nom'];
                    inscription[i][1] = data[i]['prenom'];
                    inscription[i][2] = data[i]['email'];
                }

                var csv = 'Nom, Prenom, Email\n';
                inscription.forEach(function(row) {
                    csv += row.join(', ');
                    csv += "\n";
                });

                console.log(csv);
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'inscription_'+$.cookie("eventTitle")+"_"+$.cookie("eventId")+'.csv';
                hiddenElement.click();

            }else{
            }
        }
    });

}

function displayImg(){
    /**
     * display all images about this event from the BDD
     */
    var send = "idEvent="+ $.cookie("idEvent")
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