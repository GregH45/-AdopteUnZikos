/**
 *  Constantes de configuration
**/
const AppConfig = {
          LISTEN_PORT: 8000,
          STATIC_FILE_PATH: __dirname + '/../client/www/',
          Keys: {
            KEY: __dirname + '/keys/private.key',
            CSR: __dirname + '/keys/localhost.csr',
            CRT: __dirname + '/keys/intermediate.crt'
          }
        };


/**
 *  Déclaration des dépendances
**/
const fs      = require('fs'),
      express = require('express'),
      app     = express(),
      https   = require('https');

// Création du serveur HTTPS
let server = https.createServer({
    key:  fs.readFileSync(AppConfig.Keys.KEY),
    cert: fs.readFileSync(AppConfig.Keys.CRT),
    ca:   fs.readFileSync(AppConfig.Keys.CSR)
  }, app);

const io = require('socket.io')(server);



/**
 *  Classe Utilisateur
**/
class User {

  /**
   *  Constructeur par défaut
   *  @param {Socket} Socket liée à l'utilisateur
  **/
  constructor(socket) {
    this._id = socket.id;
    this._attrs = {};
  }

  get attrs() {
    return this._attrs;
  }

  /**
   *  Récupération de l'identifiant de l'utilisateur
  **/
  get id() {
    return this._id;
  }

  attr(attr, value) {
    if (value !== undefined) {
      this._attrs[attr] = value;
    } else {
      return this._attrs[attr];
    }
  }

  toString() {
    let result = '';

    for (let key in this._attrs) {
      if (key && this._attrs[key]) {
        result += '[' + key + ']: ' + this._attrs[key] + ', ';
      }
    }

    return result.substr(0, result.length-2);
  }

}

/**
 *  Classe Liste d'utilisateurs
**/
class UserList {
  
  /**
   *  Initialisation de la liste
  **/
  constructor() {
    this._iterator = 0;
    this._users = {};
  }

  get list() {
    return this._users;
  }

  getUser(id) {
    return this._users[id];
  }

  getUserBySocketId(id) {
    for (let id in this._users) {
      if (id && this._users[id] && this._users[id].id === id) {
        return this._users[id];
      }
    }

    return false;
  }

  getUserByValue(key, value) {
    for (let id in this._users) {
      if (id && this._users[id].attr(key) == value) {
        return this._users[id];
      }
    }

    return false;
  }

  /**
   *  Ajout d'un utilisateur
   *  @param {User} Utilisateur à ajouter
  **/
  push(user) {
    this._iterator++;
    this._users[this._iterator] = user;

    return this._iterator;
  }

  /**
   *  Suppression d'un utilisateur
   *  @param {String} Identifiant de l'utilisateur à supprimer
  **/
  delete(id) {
    delete this._users[id];
  }

  /**
   *  Chaine de caractère représentant les utilisateurs
  **/
  toString() {
    let str = '';

    for (let id in this._users) {
      str += '(' + id + ') => ' + this._users[id].toString() + '\n';
    }

    return str;
  }

}



/**
 *  MAIN PROCESS
**/
(function() {

  /**
   *  Configuration du serveur web
  **/
  // Configuration des fichiers statique (css, js...)
  app.use(express.static(AppConfig.STATIC_FILE_PATH + 'views'));
  app.use(express.static(AppConfig.STATIC_FILE_PATH + 'res'));

  // Lancement du serveur sur le port d'écoute (ex: 8080)
  server.listen(AppConfig.LISTEN_PORT, (d) => {
    console.log('WebServer & Socket Server binded on ' + AppConfig.LISTEN_PORT + ' port');
  });



  /**
   *  Configuration du serveur de socket
  **/
  let userList = new UserList();

  // Ecoute des connections
  io.on('connection', function(socket) {
    let user = new User(socket);

    socket.on('persist_user', (u) => {
      if (u.id !== null && userList.getUser(u.id)) {
        user = userList.getUser(u.id);
      } else {
        // Ajout de l'utilisateur à la liste
        let id = userList.push(user);
        user.attr('id', id);
      }
      
      socket.emit('persist_user', {
        status: true,
        user: user.attrs
      });
    });

    
    // Ecoute de la déconnection
    socket.on('disconnect', function() {
      /*
      if (user.attr('id') != undefined) {
        // Suppression de l'utilisateur courant
        userList.delete(user.attr('id'));
        console.log('Disconnection:\n' + userList.toString());
      }
      */
    });




    // Appel des différents listeners
    socket.on('user_connexion', (u) => {
      // Vérification de la non existence du pseudo
      if(!userList.getUserByValue('name', u.pseudo)) {
        console.log(u);
        
        // Ajout des paramètres à l'utilisateur
        user.attr('name', u.pseudo);
        user.attr('star', u.star);

        // Réponse Positive
        socket.emit('user_connexion', {
          status: true,
          msg: 'Everything is Ok'
        }); 
      }
      else {
        // Réponse Négative
        socket.emit('user_connexion', {
          status: false,
          msg: 'Sorry, pseudo already exist'
        }); 
      }

      //console.log('User Connexion:\n' + userList.toString());
    });



    socket.on('play', (obj) => {
      if (user.attr('star')) {
        io.emit('play', obj);
      }
    });

  });

})();