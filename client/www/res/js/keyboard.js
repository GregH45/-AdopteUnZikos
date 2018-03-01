"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Classe clavier 
var keyboard = function () {
  function keyboard(Keyboard) {
    _classCallCheck(this, keyboard);

    this.keytemplate = Keyboard;
  }

  _createClass(keyboard, [{
    key: "guitarGen",
    value: function guitarGen(nbCorde) {
      if (nbCorde > 12) {
        //console.log("Nombre max de corde est 12");
        nbCorde = 12;
      }
      var guitar = new Object();
      guitar.corde = [];
      var lineKeyboard = 0;
      var quadruple = 0;
      for (var i = 0; i < nbCorde; i++) {
        if (lineKeyboard > 3) {
          lineKeyboard = 0;
        }
        var corde = new Object();
        corde.case = [];
        corde.gratte = [];
        for (var j = 0; j < this.keytemplate[lineKeyboard].length - 2; j++) {
          if (j >= 10) {
            corde.gratte.push(this.keytemplate[lineKeyboard][j + quadruple]);
          } else {
            corde.case.push(this.keytemplate[lineKeyboard][j]);
          }
        }
        guitar.corde.push(corde);
        lineKeyboard++;
        if (i == 3 || i == 7 || i == 11) {
          quadruple++;
        }
      }
      return guitar;
    }
  }]);

  return keyboard;
}();