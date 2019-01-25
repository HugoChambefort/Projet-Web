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

        var send = "password="+ $("#passwordC").val() +"&email=" + $("#emailC").val();
        $.ajax({
            url: 'http://10.131.128.250:3003/login/'/*'http://10.131.131.41:3003/test/'*/,
            method: 'GET',
            data: send,
            success:function (data) {
                console.log(data);
                if(data.length){
                    console.log(data[0]['privilege'] + " - " + data[0]['id_user']);
                    console.log("ui");
                    $.cookie("userId", data[0]['id_user']);
                    $.cookie("userRole", data[0]['privilege']);
                    $.cookie("useremail", $("#emailC").val());
                }else{
                    console.log("nope");
                    $.cookie("userId", "");
                    $.cookie("userRole", "");
                    $.cookie("useremail", "");
                }

                console.log("id: " + $.cookie("userId") + ", role: " + $.cookie("userRole") + ", email: " + $.cookie("useremail"));

            }
        });

        $.cookie("userId", "2");
        $.cookie("userRole", "1");
        $.cookie("useremail", "tom.hoyo@viacesi.fr");
        console.log($.cookie("userRole") + " " + $.cookie("useremail") + " " + $.cookie("userId"));

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

        var myJSON = {user:{name: $("#nameI").val(), firstName: $("#firstNameI").val(), email: $("#emailI").val(),
                localisation: $("#localisationI").val(), password: $("#passwordI").val()}}
        $.ajax({
            url: 'http://10.131.128.250:3003/inscription/',
            method: 'POST',
            data: myJSON,
            success:function (data) {
                console.log(data);
            }
        });

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
