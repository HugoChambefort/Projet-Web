/**
 * connection
 */
function getUserInfoC()
{

    if(document.getElementById("nameC").value && document.getElementById("firstNameC").value && document.getElementById("passwordC").value){
        $("#uncompleteC").empty();
        $("#uncompleteI").empty();

        var userC = [];
        userC[0] = document.getElementById("nameC").value;
        userC[1] = document.getElementById("firstNameC").value;
        userC[2] = document.getElementById("passwordC").value;
        //requete bdd pour verifier
        //rediriger vers l'accueil
    }else{
        /**
         * display error message
         */
        $("#uncompleteI").empty();
        $("#uncompleteC").empty();
        $("#uncompleteC").prepend("Vous devez remplir tous les champs.");
    }
}

/**
 * inscription
 */
function getUserInfoI()
{
    if(document.getElementById("nameI").value && document.getElementById("firstNameI").value &&
        document.getElementById("emailI").value && document.getElementById("localisationI").value &&
        document.getElementById("passwordI").value){
        $("#uncompleteI").empty();
        $("#uncompleteC").empty();

        var userI = [];
        userI[0] = document.getElementById("nameI").value;
        userI[1] = document.getElementById("firstNameI").value;
        userI[2] = document.getElementById("emailI").value;
        userI[3] = document.getElementById("localisationI").value;
        userI[4] = document.getElementById("passwordI").value;
        //envoyer a bbd pour ajouter
        //rediriger vers l'accueil
    }else{
        /**
         * display error message
         */
        $("#uncompleteC").empty();
        $("#uncompleteI").empty();
        $("#uncompleteI").prepend("Vous devez remplir tous les champs.");
    }







}
