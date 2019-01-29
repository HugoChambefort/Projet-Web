const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const connection = mysql.createConnection ({
		host: 'localhost',
		port: '3306',
		user: "Syd",
		password: "anouveau",
		database: "BDEWEB"
	})

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

/******************************************************************************
*
*				POST
*
******************************************************************************/

/*****************************************************************************
*	Inscription d'un nouvel utilisateur
******************************************************************************
* Récupération des champs :
*	- nom
* 	- prenom
*	- email
*	- lieu
* 	- password
* Ne retourne rien 
*****************************************************************************/

app.post('/inscription', (req, res) => {
	var nom = req.body['user']['name']
	var prenom = req.body['user']['firstName']
	var email = req.body['user']['email']
	var lieu = req.body['user']['localisation']
	var password = req.body['user']['password']

	connection.query(`INSERT INTO users (nom, prenom, password, email, privilege, id_lieu) VALUES ('${nom}', '${prenom}', '${password}', '${email}', '0', (SELECT id_lieu FROM centres WHERE centre='${lieu}'))`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		
	})
	console.log("inscription")
res.end()
})


/*****************************************************************************
*	Ajout d'une nouvelle idéee dans la boite à idée
******************************************************************************
* Récupération des champs :
*	- id utilisateur
* 	- le titre de l'idée
*	- la description de l'idée
* Ne retourne rien 
*****************************************************************************/

app.post('/nouvelleidee', (req, res) => {
	var idUser = req.body['user']['idUser']
	var	titre = req.body['user']['titre']
	var descIdee = req.body['user']['description']

	connection.query(`INSERT INTO idees (nomIdee, id_user, descIdee) VALUES ('${titre}', '${idUser}', '${descIdee}')`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("nouvelle idee")
	res.end();
})

/*****************************************************************************
*	Ajoute le like de l'utilisateur pour une idée 
*   si il n'a pas encore liker cette idée
******************************************************************************
* Récupération des champs :
*	- id de l'idée
* 	- id de l'utilisateur
* Ne retourne rien 
*****************************************************************************/

app.post('/liker', (req, res) => {
	var id_idee = req.body['user']['idIdee']
	var idUser = req.body['user']['idUser']

	connection.query(`INSERT INTO liker (id_idee, id_user) VALUES ('${id_idee}', '${idUser}')`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("nouveau like")
	res.end()
})

/*****************************************************************************
*	Creation d'un nouvel evenement par un membre du bde
******************************************************************************
* Récupération des champs :
*	- titre de l'evenement
* 	- description de l'evenement
*	- date de l'evenement
* 	- prix de l'evenement 
*	- id utilisateur pour pouvoir récuperer le centre dans le quel a 
*	lieu l'evenement
* Ne retourne rien 
*****************************************************************************/

app.post('/newevent', (req, res) => {
	var titreEvent = req.body['user']['titre']
	var descEvent = req.body['user']['description']
	var dateEvent = req.body['user']['date']
	var prixEvent = req.body['user']['price']
	var id_user = req.body['user']['idUser']
	connection.query(`INSERT INTO evenements (priceEvent, dateEvent, nomEvent, descEvent, id_lieu) VALUES ('${prixEvent}', '${dateEvent}', '${titreEvent}', '${descEvent}', (SELECT id_lieu FROM users WHERE id_user = '${id_user}'))`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("nouvel event")
	res.end()
})

/*****************************************************************************
*	Creation d'un nouvel Article 
******************************************************************************
* Récupération des champs :
*	- id utilisateur
* 	- le nom de l'article
*	- la description de l'article
*	- la categorie de l'article
*	- le prix de l'article
* Ne retourne rien 				
*****************************************************************************/

app.post('/newarticle', (req, res) => {
	var nomArticle = req.body['user']['nomArticle']
	var priceArticle = req.body['user']['priceArticle']
	var categorie = req.body['user']['categorie']
	var descArticle = req.body['user']['descArticle']
	var id_user = req.body['user']['idUser']
	//var pathImage = req.body['user']['pathImage']
	
	connection.query(`INSERT INTO images (id_user, pathImage) VALUES ('${id_user}', 'ojpjj.jpg')`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	connection.query(`INSERT INTO articles (nomArticle, priceArticle, categorie, descArticle, id_images) VALUES ('${nomArticle}', '${priceArticle}', '${categorie}', '${descArticle}', '1')`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("nouvel article")
	res.end()
})

/****************************************************************************
*	Inscription d'un etudiant à un evenement
*****************************************************************************
* Récupération des champs :
*	- id utilisateur
* 	- id de l'evenement
* Ne retourne rien 
*****************************************************************************/

app.post('/inscriptionevent', (req, res) => {
	var id_user = req.body['user']['idUser']
	var id_event = req.body['user']['idEvent']
	
	connection.query(`INSERT INTO inscrire (id_user, id_event) VALUES ('${id_user}', '${id_event}')`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	console.log("nouvel Inscription a un evenement")
	res.end()
	})
	
})

/*****************************************************************************
*
*				GET
*
******************************************************************************/

/*****************************************************************************
*	Permet de verifier et retourner les informations d'un utilisateur
******************************************************************************
* Récupération des champs :
*	- email de l'utilisateur
* 	- le password de l'utilisateur
* Retourne les champs
*	- privilege de l'utilisateur
*	- id de l'utilisateur
******************************************************************************/

app.get('/login', (req, res) => {

	var email = req.param('email')
	var password = req.param('password')

	connection.query(`SELECT privilege, id_user FROM users WHERE email = '${email}' && password = '${password}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("connexion d'un utilisateur")
		res.json(rows)
	})
})

/*****************************************************************************
*	Envoie des idées de la boite à idée
******************************************************************************
* Récupération des champs :
*	- id de l'utilisateur
* Retourne les champs
*	- id de l'idée
*	- nom de l'idée
*	- description de l'idée
*	- email de l'utilisateur 
******************************************************************************/

app.get('/boiteaidee', (req, res) => {

	var idUser = req.param('idUser')

	connection.query(`SELECT I.id_idee, I.nomIdee, I.descIdee, U.email FROM idees AS I LEFT OUTER JOIN users AS U ON I.id_user = U.id_user`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("chargement de la boite a idee")
		res.json(rows)
	})
})

/*****************************************************************************
*	Envoie des evenements
******************************************************************************
* Récupération des champs :
*	-id de l'utilisateur
* Retourne les champs
*	- id de l'evenement
*	- prix de l'evenement
*	- date de l'evenement
*	- nom de l'evenement
*	- description de l'evenement 
******************************************************************************/
	
app.get('/evenements', (req, res) => {
	var id_user = req.param('idUser')
	connection.query(`SELECT E.id_event, E.priceEvent, E.dateEvent, E.nomEvent, E.descEvent from evenements AS E INNER JOIN users AS U ON E.id_lieu = U.id_lieu WHERE U.id_user = '${id_user}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	console.log("chargement des evenements")
	res.json(rows)
	})
})

/*****************************************************************************
*	Envoie des articles pour la boutique
******************************************************************************
* Récupération d'aucun champ
* Retourne les champs
*	- id de l'article
*	- prix de l'article
*	- nom de l'article
*	- description de l'artcile
*	- categorie de l'article 
*****************************************************************************/

app.get('/boutique', (req, res) => {
	connection.query(`SELECT A.id_article, A.nomArticle, A.priceArticle, A.categorie, A.descArticle FROM articles AS A`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("chargement de la boutique")
		res.json(rows)
	})
})

/*****************************************************************************
*	envoie toutes les images d'un event
******************************************************************************
* Récupération des champs :
*	-id de l'evenement
* Retourne les champs
*	- id de l'image
*	- le chemin de l'image
*******************************************************************************/

app.get('/imagesEvent', (req, res) => {
	var id_event = req.param('idEvent')
	connection.query(`SELECT I.id_images, I.pathImage FROM images AS I INNER JOIN afficher AS A ON A.id_images = I.id_images WHERE A.id_event = '${id_event}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("chargement des images d'un evenement")
		res.json(rows)
	})
})

/*****************************************************************************
*	envoie les articles triés par categorie
******************************************************************************
* Récupération des champs :
*	- categorie voulu 
* Retourne les champs
*	- id de l'article
*	- prix de l'article
*	- nom de l'article
*	- categorie de l'article 
*	- description de l'article
*******************************************************************************/

app.get('/boutiquecategorie', (req, res) => {
	var categorie = req.param('categorie')
	connection.query(`SELECT A.id_article, A.nomArticle, A.priceArticle, A.categorie, A.descArticle FROM articles AS A WHERE categorie = '${categorie}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("chargement de la boutique avec categorie en tri")
		res.json(rows)
	})
})

/*****************************************************************************
*	envoie la liste des inscrits pour un event donné
******************************************************************************
* Récupération des champs :
*	-id de l'evenement
* Retourne les champs
*	- nom de l'etudiant
*	- prenom de l'etudiant
*	- email de l'etudiant
*******************************************************************************/

app.get('/listinscrit', (req, res) => {
	var id_event = req.param('idEvent')
	connection.query(`SELECT U.nom, U.prenom, U.email FROM users AS U INNER JOIN inscrire AS I ON U.id_user = I.id_user WHERE I.id_event = '${id_event}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
		console.log("envoie de la liste des inscrits pour un event")
		res.json(rows)
	})
})



/****************************************************************************
*
*				PUT
*
*****************************************************************************/

/*****************************************************************************
*	Creation d'un evenement à partir d'une idee
******************************************************************************
* Récupération des champs :
*	- id de l'utilisateur
*	- id de l'idée
*	- titre de l evenement
*	- description de l evenemnt
*	- date de l evenement
*	- prix de l evenement
* Ne retourne rien
*******************************************************************************/

app.put('/ideetoevent', (req, res) => {
	var id_idee = req.body['user']['idIdee']
	var titreEvent = req.body['user']['titre']
	var descEvent = req.body['user']['description']
	var dateEvent = req.body['user']['date']
	var prixEvent = req.body['user']['price']
	var id_user = req.body['user']['idUser']
	connection.query(`INSERT INTO evenements (priceEvent, dateEvent, nomEvent, descEvent, id_lieu) VALUES ('${prixEvent}', '${dateEvent}', '${titreEvent}', '${descEvent}', (SELECT id_lieu FROM users WHERE id_user = '${id_user}'))`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	
	})

	connection.query(`DELETE FROM liker WHERE id_idee = '${id_idee}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})

	connection.query(`DELETE FROM idees WHERE id_idee = '${id_idee}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("Passage d'une idee en evenement")
	res.end()
}) 

/****************************************************************************
*
*				DELETE
*
*****************************************************************************/

/*****************************************************************************
*	supprime un article
******************************************************************************
* Récupération des champs :
*	- id de l'article
* Ne retourne rien
*******************************************************************************/


app.delete('/supprarticle', (req, res) => {
	var id_article = req.param('idArticle')
	console.log(req.param('idArticle'))
	connection.query(`DELETE FROM articles WHERE id_article = '${id_article}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	console.log("suppression d'un article")
	res.end()
	})
})

/*****************************************************************************
*			supprimer event
******************************************************************************
* Récupération des champs :
*	- id de l'evenement
* Ne retourne rien
******************************************************************************/

app.delete('/supperevent', (req, res) => {
	var id_event = req.param('idEvent')
	connection.query(`DELETE FROM afficher WHERE id_event = '${id_event}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	connection.query(`DELETE FROM inscrire WHERE id_event = '${id_event}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	connection.query(`DELETE FROM evenements WHERE id_event = '${id_event}'`, (err, rows, fields) => {
		if (err) {
			console.log("Raté" + err)
			res.end()
			return
		}
	})
	console.log("suppression evenement")
	res.end()
})


/*********************************************************************************
*
*			Ecoute du port 3003
*
*********************************************************************************/
app.listen(3003, () => {
	console.log("Server is up and listening on 3003...")
})


 