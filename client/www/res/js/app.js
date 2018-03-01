'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JS File Importer
function importJSFile(path, callback) {
  var script = document.createElement('script');

  script.src = path;
  script.type = 'text/javascript';
  document.head.appendChild(script);

  if (callback) {
    script.onload = function () {
      callback();
    };
  }
}

/**
 *  Helpers Classes
**/

var Messenger = function () {
  function Messenger() {
    _classCallCheck(this, Messenger);

    this._socket = undefined;
  }

  _createClass(Messenger, [{
    key: 'listenMessage',
    value: function listenMessage(id, callback) {
      if (this.socket) {
        this.socket.on(id, callback);
      } else {
        var that = this;
        setTimeout(function () {
          that.listenMessage(id, callback);
        }, 200);
      }
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(id, obj, callback) {
      if (this.socket) {
        this.socket.emit(id, obj);

        if (callback) {
          this.listenMessage(id, callback);
        }
      } else {
        var that = this;
        setTimeout(function () {
          that.sendMessage(id, obj, callback);
        });
      }
    }
  }, {
    key: 'socket',
    get: function get() {
      return this._socket;
    },
    set: function set(socket) {
      this._socket = socket;
    }
  }]);

  return Messenger;
}();

// Shortcuts


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// Initialisation de la socket
var App = {
  Messenger: new Messenger(),
  User: undefined,
  userLoaded: function userLoaded(callback) {
    if (App.User !== undefined) {
      callback();
    } else {
      setTimeout(function () {
        App.userLoaded(callback);
      }, 100);
    }
  }
};

importJSFile('/socket.io/socket.io.js', function () {
  App.Messenger.socket = io();

  /**
   *  Récupération de la socket
  **/
  var id = window.sessionStorage.getItem('user_id');
  App.Messenger.sendMessage('persist_user', { id: id }, function (response) {
    App.User = response.user;

    window.sessionStorage.setItem('user_id', App.User.id);

    if (response.status && id != null && parseInt(App.User.id) == parseInt(id)) {
      App.User.connected = true;
    } else {
      App.User.connected = false;
    }
  });
});