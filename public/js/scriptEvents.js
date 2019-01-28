var id=0;

if(window.addEventListener){
    window.addEventListener('load', initEvent, false);
}else{
    window.attachEvent('onload', initEvent);
}
function initEvent(){
    /**
     * display "addEvent" form to student and cesi
     * display all events from bdd
     */
    var send = "idUser="+ $.cookie("userId");
    $.ajax({
        url: 'http://10.131.128.250:3003/evenements/',
        method: 'GET',
        data: send,
        success:function (data) {
            console.log(data);
            if(data.length){
                console.log("event recup");
                for(var i=0; i<data.length; i++){
                    displayEvent(data[i]['id_event'], data[i]['nomEvent'], data[i]['descEvent'] ,data[i]['priceEvent']);
                }
                id = data.length;
            }else{
                console.log("pas devent recup");
            }
        }
    });

    displayForm();
}


function displayEvent(id, title, description,price){
    /**
     * display Event
     */
    $(".event").prepend("<div class=\"card idee\" id=" + id + "-" + id +" >" +
                                "   <div class=\"card-body\n\">" +
                                "        <h5 class=\"card-title\">" + title + "</h5>" +
                                "        <p class=\"card-text scroll\">" + description + "</p>" +
                                "        <p class=\"card-title\">" + price + "</p>" +
                                "        <a  href=\"/event_spe\">" +
                                "           <button id=\'" + id + "\' onclick=\"selectEvent("+ id + ", \'"+title+"\', \'"+description+"\', "+price+");\" class=\"btn btn-primary like txtbtn\">Éditer l'événement</button>" +
                                "        </a>" +
                                "   </div>" +
                                "</div>");
}

function displayForm(){

    console.log( $.cookie("userRole"));

    if ($.cookie("userRole") == "1"){
        $("#formulaire").prepend("<div class=\"pos-f-t\">\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id=\"uncomplete\"></div><br>" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\"></textarea><br><br>\n" +
            "                        <input type=\"date\" id=\"date\" />" +
            "                        <input type='number' placeholder=\"Prix : \" id=\"price\" name=\"price\"><br><br>\n"+
            "                        <input type=\"button\" name=\"submit\" value=\"Ajouter une idée\" onclick=\"addEvent();\">\n" +
            "                    </form>\n" +
            "                </div>\n" +
            "                <nav class=\"navbar navbar-dark bg-dark\">\n" +
            "                    <h2 class=\"txtnav\">Nouvel Événement</h2>\n" +
            "                    <button class=\"navbar-toggler\" onclick=\"reset();\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarToggleExternalContent\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
            "                        <div class=\"navbar-toggler-icon\"></div>\n" +
            "                    </button>\n" +
            "                </nav><br>\n" +
            "            </div>");
    }
}


function reset()
{
    /**
     * reset form
     */
    document.getElementById("myForm").reset(); //reset form
}

function addEvent() {

        if (document.getElementById("title").value && document.getElementById("description").value && document.getElementById("price")) {
            /**
             * remove error message
             * display new idea
             * add idea in bdd
             * reset form
             */
            $("#uncomplete").empty();

            var myJSON = {user:{titre: document.getElementById("title").value, description: document.getElementById("description").value,
                    date: document.getElementById("date").value, price: document.getElementById("price").value, idUser: $.cookie("userId")}}
            console.log(myJSON);
            $.ajax({
                url: 'http://10.131.128.250:3003/newevent/',
                method: 'POST',
                data: myJSON,
                success:function (data) {
                    console.log(data);
                    displayEvent(id, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("price"));
                    id++;
                    reset();
                }
            });


        } else {
            /**
             * display error message
             */
            $("#uncomplete").empty();
            $("#uncomplete").prepend("Vous devez entrer un titre.");
        }
    }


function inscription(id, email) {
    /**
     * change "like" button to disable
     * add like in bdd
     * @type {boolean}
     */
    document.getElementById(id).disabled = true;
    var myJSON = {user:{name: $("#nameI").val(), firstName: $("#firstNameI").val()}}
    $.ajax({
        url: 'http://10.131.128.250:3003/inscription/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
        }
    });
}


function selectEvent(id, title, description, price) {
    $.cookie("eventId", id);
    $.cookie("eventTitle", title);
    $.cookie("eventDesc", description);
    $.cookie("eventPrice", price);
}