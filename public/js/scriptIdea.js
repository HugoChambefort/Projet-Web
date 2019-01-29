var id;
var data;

if(window.addEventListener){
    window.addEventListener('load', initIdees, false);
}else{
    window.attachEvent('onload', initIdees);
}

function initIdees(){
    /**
     * display "add idea" form to student and cesi
     * get all ideas from bdd with ajax request
     * display all ideas from bdd
     */
    displayForm();
    var send = "idUser="+ $.cookie("userId");
    $.ajax({
        url: 'http://10.131.128.250:3003/boiteaidee/',
        method: 'GET',
        data: send,
        success:function (data) {
            console.log(data);
            if(data.length){
                console.log(data.length);
                for(var i = 0; i< data.length; i++){
                    console.log(data[i]['id_idee'] +  " - " + data[i]['nomIdee'] + " - " + data[i]['email']);
                    console.log(data[i]['descIdee']);
                    displayIdee(data[i]['id_idee'], data[i]['nomIdee'].trim(), data[i]['descIdee'].trim(), data[i]['email']);
                    id = data[data.length - 1]['id_idee'];
                }
            }else{
                console.log("get void");
            }
        }
    });
}

function displayIdee(id, title, description, email){
    var button = "";
    /**
     * shoose button to like an idea or change an idea to event
     * display all ideas
     */
    if ($.cookie("userRole") == "1"){
        console.log( $.cookie("userRole"));
        button = "<button id=\'" + id + "\' onclick=\"selectEvent("+ id + ", \'"+title+"\', \'"+description+"\', \'"+email+"\');\" class=\"btn btn-primary like txtbtn\"><a href='#top'>Choisir cette idée pour un évenement<br>(Validez cette idée en haut de page)</a></button>";
    }else if ($.cookie("userRole") == "0" || $.cookie("userRole") == "2"){
        button = "<button id=\'" + id + "\' onclick=addLike(" + id +",\"" + $.cookie("useremail") +"\")  class=\"btn btn-primary like\">Voter pour cette idée</button>";
    }
    $(".idees").prepend("<div class=\"card idee\" id=" + id + "-" + id +" >" +
    "                               <div class=\"card-body\n\">" +
    "                                   <h5 class=\"card-title\">" + title + "</h5>" +
    "                                   <p class=\"card-text scroll\">" + description + "</p>" +
    "                                   "+ button +
    "                               </div>" +
    "                           </div>");
}

function displayForm(){
    /**
     * add "add idea" form to student and cesi
     */
    if ($.cookie("userRole") == "0"){
        $("#formulaire").prepend("<div class=\"pos-f-t\">\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id=\"uncomplete\"></div><br>" +
            "                        <input type=\"text\" placeholder=\"Titre de votre idée\" id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de votre idée\" id=\"description\" name=\"message\"></textarea><br>\n" +
            "                        <input type=\"button\" name=\"submit\" value=\"Ajouter une idée\" onclick=\"addIdea();\">\n" +
            "                    </form>\n" +
            "                </div>\n" +
            "                <nav class=\"navbar navbar-dark bg-dark\">\n" +
            "                    <h2 class=\"txtnav\">Nouvelle idée</h2>\n" +
            "                    <button class=\"navbar-toggler\" onclick=\"reset();\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarToggleExternalContent\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
            "                        <div class=\"navbar-toggler-icon\"></div>\n" +
            "                    </button>\n" +
            "                </nav><br>\n" +
            "            </div>");
    }
}
function displayFormBde(id, title, description, email){
    /**
     * display "add event" to bde
     */
    if ($.cookie("userRole") == "1"){
        $("#formulaire").prepend("<div class=\"pos-f-t \" id=\'form" + id + "\'>\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id='uncomplete'></div>" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" value=\'" + title + "\' id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\">" + description + "</textarea><br><br>\n" +
            "                        <input type=\"date\" id=\"date\" />\n<br><br>" +
            "                        <input type=\"number\" id=\"prix\" name=\"quantity\" placeholder=\"Prix de l\'événement\"><br><br>" +
            "                        <input type=\"button\" name=\"submit\" value=\"Ajouter un événement\" onclick=\"addEvent(" + id +", \'" + email +"\');\">\n" +
            "                    </form>\n" +
            "                </div>\n" +
            "                <nav class=\"navbar navbar-dark bg-dark\">\n" +
            "                    <h2 class=\"txtnav\">Ajouter événement</h2>\n" +
            "                    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarToggleExternalContent\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
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

function addIdea()
{
    if(document.getElementById("title").value &&  document.getElementById("description").value){
        /**
         * remove error message
         * add idea in bdd
         * display new idea
         * reset form
         */
        $("#uncomplete").empty();
        var myJSON = {user:{idUser: $.cookie("userId"), titre: document.getElementById("title").value, description: document.getElementById("description").value}}
        $.ajax({
            url: 'http://10.131.128.250:3003/nouvelleidee/',
            method: 'POST',
            data: myJSON,
            success:function (data) {
                console.log(data);
                id++;
                displayIdee(id, document.getElementById("title").value, document.getElementById("description").value, $.cookie("useremail"));
            }
        });
        reset();
        console.log(id);
    }else{
        /**
         * display error message
         */
        $("#uncomplete").empty();
        $("#uncomplete").prepend("Vous devez entrer un titre.");
    }
}

function addLike(id) {
    /**
     * change "like" button to disable
     * add like in bdd
     */
    var myJSON = {user:{idIdee: id, idUser: $.cookie("userId")}}
    $.ajax({
        url: 'http://10.131.128.250:3003/liker/',
        method: 'POST',
        data: myJSON,
        success:function (data) {
            console.log(data);
            document.getElementById(id).disabled = true;
            console.log(id + " - "+ $.cookie("userId"));
        }
    });
}

function addEvent(id, email) {
    if(document.getElementById("title").value && document.getElementById("description").value && document.getElementById("date").value && document.getElementById("prix").value){
        /**
         * send event to bdd
         * send email
         * remove idea
         * remove form
         */
        var myJSON = {user:{idIdee: id, idUser: $.cookie("userId"), titre: document.getElementById("title").value,
                    description: document.getElementById("description").value,
                    date: document.getElementById("date").value,
                    price: document.getElementById("prix").value}}
        $.ajax({
            url: 'http://10.131.128.250:3003/ideetoevent/',
            method: 'PUT',
            data: myJSON,
            success:function (data) {
                console.log(data);
                var link = "mailto:" + email + "?cc=&subject=Ajout d'événement&body=Bonjour, le BDE de ton école a selectionné ton idée "+ document.getElementById("title").value + " pour en faire une manifestation à laquelle tu pourras participer le "+ document.getElementById("date").value+ ", pour un prix de "+ document.getElementById("prix").value+"€.";
                window.location.href = link;
                document.getElementById(id + "-" + id).remove();
                document.getElementById("form" + id).remove();
            }
        });
       }else{
        /**
         * display error message
         */
        $("#uncomplete").empty();
        $("#uncomplete").prepend("Vous devez entrer un titre, une description, et une date.");
    }
}
function selectEvent(id, title, description, email) {
    /**
     * display form with idea values
     */
    $("#formulaire").empty();
    displayFormBde(id, title, description, email);
}