'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Classe clavier 
var keyboard = function () {
  function keyboard(Keyboard) {
    _classCallCheck(this, keyboard);

    this.keytemplate = Keyboard;
  }

  _createClass(keyboard, [{
    key: 'guitarGen',
    value: function guitarGen(nbCorde) {
      if (nbCorde > 12) {
        console.log("Nombre max de corde est 12");
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

// Quelle corde gratte


function whoGratte(guitar, touche) {
  for (var i = 0; i < guitar.corde.length; i++) {
    var isGratte = guitar.corde[i].gratte.indexOf(touche);
    if (isGratte != -1) {
      return i;
    }
  }
  return -1;
}

// Jouer le son
function play(Son) {
  for (var i = 0; i < Son.cases_binary.length; i++) {
    if (Son.cases_binary[i] == true) {
      var sound = new Howl({
        src: ['/sound/piano/Corde_' + Son.corde + '_Case_' + i + '.mp3']
      });
      sound.play();
      console.log("Son : Corde " + Son.corde + " avec la case " + i);
    }
  }
}
function play_one_case(Son) {
  var sound = new Howl({
    src: ['/sound/piano/Corde_' + Son.corde + '_Case_' + Son.case + '.mp3']
  });
  sound.play();
  console.log("Son : Corde " + Son.corde + " avec la case " + Son.corde);
}
/*************************************************************
*************************************************************/

//  Mon clavier
var Keyboard_Azerty = [['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', '/', '*', '-'], ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', ',', 'o', '7', '8', '9'], ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', '4', '5', '6'], ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '1', '2', '3']];
var monClavier = new keyboard(Keyboard_Azerty);

//console.log(maGuitar.guitarGen(12));

// Mon objet guitare
var maGuitar = monClavier.guitarGen(4);

console.log(maGuitar);

// Historique de jeu pour le process
var history_case = "";
var history_corde = "";
var history_down = [];
var history_case_id = [];
var history_binary_play = [false, false, false, false, false, false, false, false, false, false];

// Une fois le temps passé on estime que la gratte est terminé sur cette corde il faut ainsi retirer le lock
// En supprimant les historique
function myTimer() {

  if (history_down != "" && history_corde != "") {
    var ObjectSon = new Object();
    ObjectSon.corde = history_corde;
    ObjectSon.gratte = history_case;
    //ObjectSon.cases_noId = history_down;
    //ObjectSon.cases_Id = history_case_id;
    ObjectSon.cases_binary = history_binary_play;
    console.log(ObjectSon);
    //play(ObjectSon);
    //console.log("La corde utilisé : "+ corde +" Les cases jouées sont : "+ cases);
  }

  history_case = "";
  history_corde = "";
  history_down = [];
  //history_case_id = [];
  history_binary_play = [false, false, false, false, false, false, false, false, false, false];
}

// Si une touche est préssé on lance levent
document.addEventListener('keydown', function (event) {
  // Recuperer la touche appuyé
  var nomTouche = event.key;

  // Recupere le numéro de corde actuelle si existant
  var numero_corde = history_corde;

  // affiche la touche en console
  //console.log(`Touche pressée ${nomTouche}`);

  // Si c'est gratté
  if (whoGratte(maGuitar, nomTouche) != -1) {

    // On stocke le numero de corde gratté
    history_corde = whoGratte(maGuitar, nomTouche);

    //On ajoute dans l'hsitorique quel bouton on a utiliser pour la corde
    history_case = nomTouche;

    // Gestion de la file temporaire avec timer 
    var myVar = setInterval(myTimer, 5000);
  }
  // Verifie que une gratte est en cours
  if (numero_corde != "") {

    // Si une touche est joué donc combinaison de gratté et d'appuie sur corde correspondant a la gratte
    if (maGuitar.corde[numero_corde].gratte.indexOf(history_case) != -1 && maGuitar.corde[numero_corde].gratte.indexOf(nomTouche) == -1 && maGuitar.corde[numero_corde].case.indexOf(nomTouche) != -1) {

      // Recupere l'historique du jeu de guitare
      history_binary_play[maGuitar.corde[numero_corde].case.indexOf(nomTouche)] = true;;
      history_down.push(nomTouche);
      //history_case_id.push(maGuitar.corde[numero_corde].case.indexOf(nomTouche));
      //var data_existant = history_down + nomTouche + ";"; 

      // On ajoute a l'historique
      //history_down = data_existant;

      // Lance un son (pour l'instant sorti en console)
<<<<<<< HEAD:client/www/js/keyboard_v2.js
      //console.log("un son a lancer sur la corde " + numero_corde + " avec la case " + nomTouche);
=======

      console.log("un son a lancer sur la corde " + numero_corde + " avec la case " + nomTouche);
      var ObjectOneSon = new Object();
      ObjectOneSon.corde = numero_corde;
      ObjectOneSon.case = maGuitar.corde[numero_corde].case.indexOf(nomTouche);
      play_one_case(ObjectOneSon);
>>>>>>> 5a9d5712da7c382c4d89ecb8a5ee831b81349e89:client/www/res/js/keyboard_v2.js
    }
  }
}, false);