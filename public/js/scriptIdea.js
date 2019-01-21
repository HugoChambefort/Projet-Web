
var role = "bde";


var idees = [[0, "titre exemple 0", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [1, "titre exemple 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [2, "titre exemple 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", true],
    [3, "titre exemple 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [4, "titre exemple 4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", true],
    [5, "titre exemple 5", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false]];


if(window.addEventListener){
    window.addEventListener('load', initIdees, false);
}else{
    window.attachEvent('onload', initIdees);
}

function initIdees(){
    /*var now = new Date();
    alert(now);
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = day + '-' + month + '-' + now.getFullYear();
    alert(today);*/
    displayForm();
    for(var i = 0; i < idees.length; i++)
    {
        displayIdee(idees[i][0], idees[i][1], idees[i][2]);
        if (role == "student") {
            document.getElementById(idees[i][0]).disabled = idees[i][3];
        }
    };
}

function displayIdee(id, title, description){
    var button;

    if (role == "bde"){
        button = "onclick=selectEvent(" + id + ")  class=\"btn btn-primary like txtbtn\">Choisir cette idée pour un évenement";
    }else {
        button = "onclick=addLike(" + id + ")  class=\"btn btn-primary like\">Voter pour cette idée";
    }

    $(".idees").prepend("<div class=\"card idee\" id=" + id + "-" + id +" ><div class=\"card-body\n\"><h5 class=\"card-title\">" + title + "</h5><p class=\"card-text scroll\">" + description + "</p><button id=\'" + id + "\' " + button + "</button></div></div>");

}

function displayForm(){
    if (role == "student"){
        $("#formulaire").prepend("<div class=\"pos-f-t\">\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm\">\n" +
            "                        <input type=\"text\" placeholder=\"Titre de votre idée\" id=\"title\" name=\"title\" size=\"30\"><div id=\"uncomplete\"></div><br>\n" +
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

    if (role == "bde"){
        $("#formulaire").prepend("<div class=\"pos-f-t \" id=\'form" + id + "\'>\n" +
            "                <div class=\"collapse\" id=\"navbarToggleExternalContent\">\n" +
            "                    <form class=\"bg-dark p-4\" id=\"myForm uncomplete\">\n" +
            "                        <input type=\"text\" placeholder=\"Titre de l'événement\" value=\'" + idees[id][1] + "\' id=\"title\" name=\"title\" size=\"30\"><br><br>\n" +
            "                        <textarea class=\"description\" placeholder=\"Description de l'événement\" id=\"description\" name=\"message\">" + idees[id][2] + "</textarea><br><br>\n" +
            "                        <input type=\"date\" id=\"date\" />\n<br><br>" +
            "                        <input type=\"file\" name=\"myFile\"><br><br>" +
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
    document.getElementById("myForm").reset(); //reset form
}

function addIdea()
{
    if(document.getElementById("title").value){
        $("#uncomplete").empty();
        var id = 1; //id_idee
        displayIdee(id, $("#title").value, $("#description").value);
        reset();
    }else{
        $("#uncomplete").empty();
        $("#uncomplete").prepend("Vous devez entrer un titre.");
    }

}

function addLike(id) {
    document.getElementById(id).disabled = true;
    //idees[id][3] = true;
    //add like to idea with id_idee = id in bdd
    //rendre le boutton noncliquable
}

function addEvent(id) {

    if(document.getElementById("title").value && document.getElementById("description").value && document.getElementById("date").value){

        document.getElementById(id + "-" + id).remove();
        document.getElementById("form" + id).remove();
    }else{
        $("#uncomplete").empty();
        $("#uncomplete").prepend("Vous devez entrer un titre, une description, et une date.");
    }


}
function selectEvent(id) {

    $("#formulaire").empty();

    displayFormBde(id);
}