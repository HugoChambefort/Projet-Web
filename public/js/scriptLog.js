IP = "10.131.128.250:3003"
/**
 * connection
 */
function getUserInfoC()
{


    if($("#emailC").val() && $("#passwordC").val()){
        $("#uncompleteC").empty();
        $("#uncompleteI").empty();
        //requete bdd pour verifier
        //rediriger vers l'accueil

        var myJSON = {user:[{email: $("#emailC").val(), password: $("#passwordC").val()}]}
        $.ajax({
            url: 'http://10.131.128.250:3003/login/',
            method: 'POST',
            data: myJSON,
            success:function (data) {
                console.log(data);
            }
        });
        $.cookie("userRole", $("#emailC").val());
        $.cookie("useremail", "tom.hoyo@viacesi.fr");
        console.log($.cookie("userRole") + " " + $.cookie("useremail"));

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
    if($("#nameI").val() && $("#firstNameI").val() && $("#emailI").val() && $("#localisationI").val() && $("#passwordI").val()){
        $("#uncompleteI").empty();
        $("#uncompleteC").empty();

        var myJSON = {user:[{name: $("#nameI").val(), firstName: $("#firstNameI").val(), email: $("#emailI").val(),
                localisation: $("#localisationI").val(), password: $("#passwordI").val()}]}
        $.ajax({
            url: 'http://10.131.128.250:3003/Insciption/',
            method: 'POST',
            data: myJSON,
            success:function (data) {
                console.log(data);
            }
        });

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
