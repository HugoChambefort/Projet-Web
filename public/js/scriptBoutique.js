
    /* *********************************Check si un membre du BDE est co************************************ */
    
    if ($.cookie("userRole") == 1){
        
        $(".ajouterArticle").prepend("<a href=\"#\" id=\"button\" class=\"button\">Add Article</a>");
        console.log( $.cookie("userRole"));
    }
    
    /* *********************************Initialise les EventListener**************************************** */
    
    if(window.addEventListener){
        window.addEventListener('load', initBoutique);
    }else{
        window.attachEvent('onload', initBoutique);
    }
    
    /* *********************************Remplir la boutique avec les informations de la BDD***************** */

    function initBoutique(){
        var send = ''
        $.ajax({
            url: 'http://10.131.128.250:3003/boutique',
            method: 'get',
            data: send,
            success:function (data) {
            console.log(data);
                if(data.length){
                    console.log("ui");
                    for(var i = 0; i< data.length; i++){
                        var idCorrect = data[i]['id_article'];
                        console.log(data[i]['id_article']);
                        displayBoutique(data[i]['id_article'], data[i]['nomArticle'], data[i]['categorie'], data[i]['descArticle'], data[i]['priceArticle']);
                    }

                }else{console.log("nope");}
                console.log(idCorrect);
        }
    });
}

        function displayBoutique(/*img,*/ id, titre, categorie, description, prix){
            console.log(id);
            var btn = "";
            if ($.cookie("userRole") == 1){

                console.log( $.cookie("userRole"));
                btn = "<button onclick=\"delArticleBoutique("+id+")\" id=\""+id+"\">Supprimer</button>";
            }
            $(".imgAV").prepend("<div id=\'"+id+"-"+id+"\' class=\"imgText\"><img id=\"aVendre\" src=\"http://placehold.it/300x300\" alt=\"osef img\"><p class=\"NomArticle\" id=\"title\"><strong>" + titre + "</strong><br>"+categorie+"<br>" + description + "<br><strong>Prix : </strong>" + prix + "€</p><button class=\"boutonAdd\" onclick=\"addPannier("+id+",\'"+titre+"\',\'"+categorie+"\',\'"+description+"\',"+prix+"), openRightMenu(), addPrixPanier("+id+", "+prix+")\" id=\""+id+"\">Ajouter au panier</button>"+ btn + "</div>");
        }

    
    /* *********************************Ajouter au panier*************************************************** */
    
    function addPannier(id, titre, categorie, description, prix){
          
        $(".panier").prepend("<div id=\'"+id+"-"+id+"\' class=\"itemPanier\"><p class=\"NomArticle\" id=\"itemPanier\"><strong>"+titre+"</strong><br>"+categorie+"<br>"+description+"<br><strong>Prix : </strong>"+prix+"€</p><button class=\"boutonSupp\" onclick=\"delElemPanier("+id+"), delPrixPanier("+id+", "+prix+")\" id=\""+id+"\">Supprimer</div>");
        /*$(".panier").prepend("<div class=\"itemPanier\"><p class=\"NomArticle\" id=\"itemPanier\"><strong>"+boutique[idCorrect-1][2]+"</strong><br>"+boutique[idCorrect-1][3]+"<br>"+boutique[idCorrect-1][4]+"<br><strong>Prix : </strong>"+boutique[idCorrect-1][5]+"€</p><button class=\"boutonSupp\" onclick=\"delElemPanier(this.parentNode), delPrixPanier(this.id)\" id=\""+id+"\">Supprimer</div>");*/
        
    }
    
    /* *********************************Supprimer*********************************************************** */
    
    function delElemPanier(id){
        
        // id.parentNode.removeChild(id);  
        document.getElementById(id+"-"+id).remove();
    }
    
    function delArticleBoutique(id){
        
        if (confirm("Voulez-vous vraiment supprimer cet artcile de la boutique ?")) {
            
            console.log(id);
            
            var send = "idArticle="+ id;

                $.ajax({
                url: 'http://10.131.128.250:3003/supprarticle',
                method: 'DELETE',
                data: send,
                success:function (data) {

                     document.getElementById(id+"-"+id).remove();
                    
                }
            });

        }
    }
    
    /* *********************************Meilleurs ventes**************************************************** */
    
    function meilleursVentes(){
        var send = ''
        $.ajax({
            url: 'http://10.131.128.250:3003/meilleursVentes',
            method: 'get',
            data: send,
            success:function (data) {
                console.log(data);
                if(data.length){
                    console.log("ui");
                    console.log(data.length);
                    for(var i = 0; i< data.length; i++){
                        
                        displayBestSellers(data[i]['id_articles'], data[i]['nomArticle'], data[i]['categorie'], data[i]['descArticle'], data[i]['priceArticle']);
                    }
                }else{console.log("nope");}
            }
        });
    }
    
    function displayBestSellers(/*img,*/ titre, categorie, description, prix, id){
        console.log(id);
        $(".imgAV").prepend("<div class=\"imgText\"><img id=\"aVendre\" src=\"http://placehold.it/300x300\" alt=\"osef img\"><p class=\"NomArticle\" id=\"title\"><strong>" + titre + "</strong><br>"+categorie+"<br>" + description + "<br><strong>Prix : </strong>" + prix + "€</p><button class=\"boutonAdd\" onclick=\"addPannier(this.id), openRightMenu(), addPrixPanier(this.id)\" id=\""+id+"\">Ajouter au panier</button></div>");
    }
    
    /* *********************************Tri par catégorie*************************************************** */

    function tri(){
        var send = "categorie="+ document.getElementById("triCat").value;
        if (document.getElementById("triCat").value == 'choisissez') {
            initBoutique();
        }else{
        $.ajax({
            url: 'http://10.131.128.250:3003/boutiquecategorie',
            method: 'GET',
            data: send,
            success:function (data) {
                console.log(data);
                if(data.length){
                    console.log("ui");
                    $("#Sav").empty();
                    for(var i = 0; i< data.length; i++){
                        var idCorrect = data[i]['id_article'];
                        console.log(data[i]['id_article']);
                        displayBoutique(data[i]['id_article'], data[i]['nomArticle'], data[i]['categorie'], data[i]['descArticle'], data[i]['priceArticle']);
                    }

                }else{console.log("nope");}

        }
    });}
    }

    /* *********************************Calcule prix du panier********************************************** */
    
    tampon = 0;

    function addPrixPanier(id, prix){
        
        // prix = boutique[id-1][5];
        // var  prixCorrect = parseInt(prix); 
        console.log(prix);
        tampon = tampon + prix
        $("div.total").replaceWith("<div class=\"total\" id=\""+id+"\"></div>")
        $(".total").prepend("<h3 class=\"totale\" id=\""+id+"\">Montant total : "+tampon+"€<button class=\"payer\">Payer</button></h3>");
    }
    
    function delPrixPanier(id, prix){
        
        // prix = boutique[id-1][5];
        var  prixCorrect = parseInt(prix);  
        tampon = tampon - prixCorrect;

        if (tampon == 0) {

            $("div.total").replaceWith("<div class=\"total\" id=\""+id+"\"></div>")
            $(".total").prepend("<h3 class=\"totale\" id=\""+id+"\">Montant total : "+tampon+"€</h3>"); 

        }else{
            
            $("div.total").replaceWith("<div class=\"total\" id=\""+id+"\"></div>")
            $(".total").prepend("<h3 class=\"totale\" id=\""+id+"\">Montant total : "+tampon+"€<button class=\"payer\">Payer</button></h3>");
        }
    }
    
    /* *********************************Sidebar fonction ouvrir/fermer************************************** */
    
    function openRightMenu() {
        document.getElementById("rightMenu").style.display = "block";
    }
    
    function closeRightMenu() {
        document.getElementById("rightMenu").style.display = "none";
    }
    
    /* *********************************Formulaire fonction ouvrir/fermer*********************************** */
    
    document.getElementById('button').addEventListener("click", function() {
        document.querySelector('.bg-modal').style.display = "flex";
    });
    
    document.querySelector('.close').addEventListener("click", function() {
        document.querySelector('.bg-modal').style.display = "none";
    });
    
    /* *********************************Formulaire charger une image**************************************** */
    
    $(window).load(function(){
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#recupImg').attr('src', e.target.result);
                };
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#displayImg").change(function(){
            readURL(this);
        });
    });
    
    /* *********************************Reset le formulaire************************************************* */
    
    function reset(){
        
        $("img#recupImg").replaceWith("<img id=\"recupImg\" src=\"#\" alt=\"Votre image\" style=\"height:10%; width:auto;\">")
        document.getElementById("formAddArticle").reset(); //reset form
    }
    
    /* *********************************Envoyer le formulaire*********************************************** */
    
    function addArticle(){
        var myJSON = {user:{idUser: $.cookie("userId"), nomArticle: document.getElementById("nom").value,
                            categorie: document.getElementById("exampleFormControlSelect2").value,
                            descArticle: document.getElementById("description").value,
                            priceArticle: document.getElementById("prix").value
        }}
        $.ajax({
            url: 'http://10.131.128.250:3003/newarticle',
            method: 'POST',
            data: myJSON,
            success:function (data) {
            

        }
    });
    }
    