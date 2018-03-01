// JS File Importer
function importJSFile(path, callback) {
  let script = document.createElement('script');

  script.src = path;
  script.type = 'text/javascript';
  document.head.appendChild(script);

  if (callback) {
    script.onload = function() {
      callback();
    }
  }
}

/**
 *  Helpers Classes
**/
class Messenger {

  constructor() {
    this._socket = undefined;
  }

  get socket() {
    return this._socket;
  }

  set socket(socket) {
    this._socket = socket;
  }

  listenMessage(id, callback) {
    if (this.socket) {
      this.socket.on(id, callback);
    } else {
      let that = this;
      setTimeout(() => {
        that.listenMessage(id, callback);
      }, 200);
    }
  }

  sendMessage(id, obj, callback) {
    if (this.socket) {
      this.socket.emit(id, obj);

      if (callback) {
        this.listenMessage(id, callback);
      }
    } else {
      let that = this;
      setTimeout(() => {
        that.sendMessage(id, obj, callback);
      });
    }
  }

}


// Shortcuts
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;


// Initialisation de la socket
var App = {
  Messenger: new Messenger(),
  User: undefined,
  userLoaded: (callback) => {
    if (App.User !== undefined) {
      callback();
    } else {
      setTimeout(() => {
        App.userLoaded(callback);
      }, 100);
    }
  }
};

importJSFile('/socket.io/socket.io.js', function() {
  App.Messenger.socket = io();

  /**
   *  Récupération de la socket
  **/
  let id = window.sessionStorage.getItem('user_id');
  App.Messenger.sendMessage('persist_user', { id: id }, (response) => {
    App.User = response.user;

    window.sessionStorage.setItem('user_id', App.User.id);

    if (response.status && id != null && parseInt(App.User.id) == parseInt(id)) {
      App.User.connected = true;
    } else {
      App.User.connected = false;
    }

  });

});

