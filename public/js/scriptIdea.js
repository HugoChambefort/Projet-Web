var idees = [[1, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [2, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [3, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", true],
    [4, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false],
    [5, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", true],
    [6, "titre exemple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", false]];

if(window.addEventListener){
    window.addEventListener('load', initIdees, false);
}else{
    window.attachEvent('onload', initIdees);
}
function initIdees(){
    for(var i = 0; i < 6; i++)
    {
        displayIdee(idees[i][0], idees[i][1], idees[i][2]);
        document.getElementById(idees[i][0]).disabled = idees[i][3];
    };
}
function displayIdee(id, title, description){
    $(".idees").prepend("<div class=\"card idee\" ><div class=\"card-body\n\"><h5 class=\"card-title\">" + title + "</h5><p class=\"card-text scroll\">" + description + "</p><button id=\'" + id + "\'  onclick=addLike(" + id + ")  class=\"btn btn-primary like\">Voter pour cette idée</button></div></div>");
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
        displayIdee(id, document.getElementById("title").value, document.getElementById("desciption").value);
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