/**
 * connection
 */
function getUserInfoC()
{
    if($("#emailC").val() && $("#passwordC").val()){
        $("#uncompleteC").empty();
        $("#uncompleteI").empty();
        var send = "password="+ $("#passwordC").val() +"&email=" + $("#emailC").val();
        $.ajax({
            url: 'http://10.131.128.250:3003/login/',
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
                    $("#uncompleteC").prepend("Votre email ou votre mot de passe est erroné.");

                }
                console.log("id: " + $.cookie("userId") + ", role: " + $.cookie("userRole") + ", email: " + $.cookie("useremail"));
            }
        });

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


        if (/@viacesi.fr$|@cesi.fr$/.test($("#emailI").val())) {
            console.log('bon email');
            if (/[A-Z]/.test($("#passwordI").val())) {
                if (/[0-9]/.test($("#passwordI").val())) {
                    console.log('mot de passe bon');
                    var myJSON = {user:{name: $("#nameI").val(), firstName: $("#firstNameI").val(), email: $("#emailI").val(),
                            localisation: $("#localisationI").val(), password: $("#passwordI").val()}}
                    console.log(myJSON);
                    $.ajax({
                        url: 'http://10.131.128.250:3003/inscription/',
                        method: 'POST',
                        data: myJSON,
                        success:function (data) {
                            console.log(data);
                        }
                    });
                } else {
                    console.log('pas nbr');
                    $("#uncompleteI").prepend("Votre mot de passe doit contenir au moins un nombre et une majuscule.");
                }
            } else {
                console.log('pas maj');
                $("#uncompleteI").prepend("Votre mot de passe doit contenir au moins un nombre et une majuscule.");
            }
        } else {
            console.log('mauvais email');
            $("#uncompleteI").prepend("Votre adresse mail n'est pas valable.");
        }
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
