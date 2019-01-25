var id = lastId();

if(window.addEventListener){
    window.addEventListener('load', initEvent, false);
}else{
    window.attachEvent('onload', initEvent);
}

function displayEvent(id, title, description,price){
    var button;
    /**
     * shoose button to like an idea or change an idea to event
     */
    if ($.cookie("userRole") == "BDE"){
        console.log( $.cookie("userRole"));
        button = "onclick=selectEvent(" + id +") class=\"btn btn-primary like txtbtn\"><a href='/evenement_spe' style='color: white;'>Éditer l'événement</a>";
    }else {
        button = "onclick=addLike(" + id +",\"" + $.cookie("useremail") +"\")  class=\"btn btn-primary like\"><a onclick='inscription()' style='color: white;'>Voir l'événement </a>";
    }

    /**
     * display Event
     */
    $(".event").prepend("<div class=\"card idee\" id=" + id + "-" + id +" >" +
        "<div class=\"card-body\n\">" +
        "<h5 class=\"card-title\">" + title + "</h5>" +
        "<p class=\"card-text scroll\">" + description + "</p>" +
        "<p class=\"card-title\">" + price + "</p>" +
        "<button id=\'" + id + "\' " + button + "</button><" +
        "/div>" +
        "</div>");

}

function displayForm(){

    console.log( $.cookie("userRole"));

    if ($.cookie("userRole") == "BDE"){
        $("#formulaire").prepend("<div class=\"pos-f-t\">\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id=\"uncomplete\"></div><br>" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\"></textarea><br>\n" +
            "                        <input type='number' placeholder=\"Prix : \" id=\"price\" name=\"price\"><br>\n"+
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
function displayFormBde(id){
    /**
     * display "add event" form to bde
     */
    if ($.cookie("userRole") == "Etudiant"){
        $("#formulaire").prepend("<div class=\"pos-f-t \" id=\'form" + id + "\'>\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id='uncomplete'></div>" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" value=\'" + getTitleById(id) + "\' id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\">" + getDescriptionById(id) + "</textarea><br>\n" +
            "                        <textarea  id=\"price\" name=\"price\">" + getPriceById(id) + "</textarea><br>\n"+
            "                        <input type=\"date\" id=\"date\" />\n<br><br>" +
            "                        <input type=\"file\" name=\"myFile\" style='color: #ffffff'><br><br>" +
            "                        <input type=\"button\" name=\"submit\" value=\"Ajouter un événement\" onclickg=\"addEvent(" + id +", \'\">\n" +
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

function addEvent() {

        if (document.getElementById("title").value && document.getElementById("description").value && document.getElementById("price")) {
            /**
             * remove error message
             * display new idea
             * add idea in bdd
             * reset form
             */
            $("#uncomplete").empty();
            displayEvent(id, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("price"));
            id++;

            /*var myJSON = {user:[{email:document.getElementById("emailC").value,
                    password:document.getElementById("passwordC").value}]}
            $.ajax({
                url: 'http://10.131.128.250:3003/login/',
                method: 'POST',
                data: myJSON,
                success:function (data) {
                    console.log(data);
                }
            });*/
            reset();

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


function selectEvent(id) {
    /**
     * display form with idea values
     */
    $("#formulaire").empty();

}