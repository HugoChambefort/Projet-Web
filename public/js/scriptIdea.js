var role = "Etudiant";
var userId = 52;
var id = lastId();

if(window.addEventListener){
    window.addEventListener('load', initIdees, false);
}else{
    window.attachEvent('onload', initIdees);
}

function displayIdee(id, title, description){
    var button;
    /**
     * shoose button to like an idea or change an idea to event
     */
    if (role == "BDE"){
        button = "onclick=selectEvent(" + id + ")  class=\"btn btn-primary like txtbtn\"><a href='#top'>Choisir cette idée pour un évenement<br>(Validez cette idée en haut de page)</a>";
    }else {
        button = "onclick=addLike(" + id + ")  class=\"btn btn-primary like\">Voter pour cette idée";
    }

    /**
     * display idea
     */
    $(".idees").prepend("<div class=\"card idee\" id=" + id + "-" + id +" ><div class=\"card-body\n\"><h5 class=\"card-title\">" + title + "</h5><p class=\"card-text scroll\">" + description + "</p><button id=\'" + id + "\' " + button + "</button></div></div>");

}

function displayForm(){
    /**
     * add "add idea" form to student and cesi
     */
    if (role == "Etudiant"){
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
function displayFormBde(id){
    /**
     * display "add event" form to bde
     */
    if (role == "BDE"){
        $("#formulaire").prepend("<div class=\"pos-f-t \" id=\'form" + id + "\'>\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <div id='uncomplete'></div>" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" value=\'" + getTitleById(id) + "\' id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\">" + getDescriptionById(id) + "</textarea><br><br>\n" +
            "                        <input type=\"date\" id=\"date\" />\n<br><br>" +
            "                        <input type=\"file\" name=\"myFile\" style='color: #ffffff'><br><br>" +
            "                        <input type=\"button\" name=\"submit\" value=\"Ajouter un événement\" onclick=\"addEvent(" + id + ");\">\n" +
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
         * display new idea
         * add idea in bdd
         * reset form
         */
        $("#uncomplete").empty();
        alert(id);
        displayIdee(id, document.getElementById("title").value, document.getElementById("description").value);
        id++;
        var obj = { action: "Add", title: document.getElementById("title").value, description: document.getElementById("description").value, userId: userId};
        var myJSON = JSON.stringify(obj);
        $.ajax({
            url: 'http://10.131.131.41:3003/test/',
            method: 'POST',
            data: myJSON,
            success: function (data) {
                console.log(data);
            }
        });
        reset();

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
     * @type {boolean}
     */
    document.getElementById(id).disabled = true;
    var obj = { action: "like", id: id, userId: userId};
    var myJSON = JSON.stringify(obj);
    $.ajax({
        url: 'http://10.131.131.41:3003/test/',
        method: 'GET',
        data: myJSON,
        success: function (data) {
            console.log(data);
        }
    });
}

function addEvent(id) {
    if(document.getElementById("title").value && document.getElementById("description").value && document.getElementById("date").value){
        /**
         * send values
         */
        var obj = { action: "Remove", title: document.getElementById("title").value, description: document.getElementById("description").value, date: document.getElementById("date").value, image: "path...", userId: userId};
        var myJSON = JSON.stringify(obj);
        $.ajax({
            url: 'http://10.131.131.41:3003/test/',
            method: 'POST',
            data: myJSON,
            success: function (data) {
                console.log(data);
            }
        });
        /**
         * remove idea and form
         */
        document.getElementById(id + "-" + id).remove();
        document.getElementById("form" + id).remove();
    }else{
        /**
         * display error message
         */
        $("#uncomplete").empty();
        $("#uncomplete").prepend("Vous devez entrer un titre, une description, et une date.");
    }
}
function selectEvent(id) {
    /**
     * display form with idea values
     */
    $("#formulaire").empty();
    displayFormBde(id);
}