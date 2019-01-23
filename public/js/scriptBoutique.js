

  var boutique = [[1, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ", "22", ],
    [2, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ", "12", ],
    [3, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ", "28",],
    [4, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ", "5",],
    [5, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ", "63",],
    [6, "http://placehold.it/300x300", "Nom de l'objet", "Catégorie", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", "42",]];


    if(window.addEventListener){
        window.addEventListener('load', initBoutique);
    }else{
        window.attachEvent('onload', initBoutique);
    }

    /* *********************************Remplir la boutique avec les informations de la BDD***************** */

    function initBoutique(){
            for(var i = 0; i < 6; i++)
            {
                displayBoutique(boutique[i][1], boutique[i][2], boutique[i][3], boutique[i][4], boutique[i][5], boutique[i][0]);
            };
        }

    function displayBoutique(img, titre, categorie, description, prix, id){
        
        $(".imgAV").prepend("<div class=\"imgText\"><img id=\"aVendre\" src=\"" + img + "\" alt=\"osef img\"><p class=\"NomArticle\" id=\"title\"><strong>" + titre + "</strong><br>"+categorie+"<br>" + description + "<br><strong>Prix : </strong>" + prix + "€</p><button class=\"boutonAdd\" onclick=\"addPannier(this.id),openRightMenu(),addPrixPanier(this.id)\" id=\""+id+"\">Ajouter au panier</button></div>");
    }

    
    /* *********************************Ajouter au panier*************************************************** */
    
    function addPannier(id){
        
        var  idCorrect = parseInt(id);   
        $(".panier").prepend("<div class=\"itemPanier\"><p class=\"NomArticle\" id=\"itemPanier\"><strong>"+boutique[idCorrect-1][2]+"</strong><br>"+boutique[idCorrect-1][3]+"<br>"+boutique[idCorrect-1][4]+"<br><strong>Prix : </strong>"+boutique[idCorrect-1][5]+"€</p><button class=\"boutonSupp\" onclick=\"delElemPanier(this.parentNode), delPrixPanier(this.id)\" id=\""+id+"\">Supprimer</div>");
        
        
    }
    
    /* *********************************Supprimer du panier************************************************* */
    
    tampon = 0;

    function delElemPanier(id){

        id.parentNode.removeChild(id);
    }
    
    /* *********************************Calcule prix du panier********************************************** */

    function addPrixPanier(id){
        prix = boutique[id-1][5];
        var  prixCorrect = parseInt(prix);  
        tampon = tampon + prixCorrect;
        $("div.total").replaceWith("<div class=\"total\" id=\""+id+"\"></div>")
        $(".total").prepend("<h3 class=\"totale\" id=\""+id+"\">Montant total : "+tampon+"€</h3>");
    }

    function delPrixPanier(id){

        prix = boutique[id-1][5];
        var  prixCorrect = parseInt(prix);  
        tampon = tampon - prixCorrect;
        $("div.total").replaceWith("<div class=\"total\" id=\""+id+"\"></div>")
        $(".total").prepend("<h3 class=\"totale\" id=\""+id+"\">Montant total : "+tampon+"€</h3>");
    }


    /* *********************************Sidebar************************************************************* */
    function openRightMenu() {
        document.getElementById("rightMenu").style.display = "block";
    }
    
    function closeRightMenu() {
        document.getElementById("rightMenu").style.display = "none";
    }
