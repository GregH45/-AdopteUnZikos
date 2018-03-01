'use strict';

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
// Quelle case est appuyé
function whoCase(guitar, touche) {
  for (var i = 0; i < guitar.corde.length; i++) {
    var isCase = guitar.corde[i].case.indexOf(touche);
    if (isCase != -1) {
      return i;
    }
  }
  return -1;
}
//  Mon clavier
var Keyboard_Azerty = [['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', '/', '*', '-'], ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', ',', 'o', '7', '8', '9'], ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', '4', '5', '6'], ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '1', '2', '3']];
var monClavier = new keyboard(Keyboard_Azerty);

//console.log(maGuitar.guitarGen(12));

// Mon objet guitare
var maGuitar = monClavier.guitarGen(4);

//console.log(maGuitar);

var historique_gratte = [];
for (var i = 0; i < maGuitar.corde.length; i++) {
  historique_gratte.push(false);
}

console.log(historique_gratte);

// Si une touche est préssé on lance levent
document.addEventListener('keydown', function (event) {
  //DEBUG
  //console.log("Entrer dans levent keydown");
  // Recuperer la touche appuyé
  var nomTouche = event.key;

  // Si la touche est une gratte
  if (whoGratte(maGuitar, nomTouche) != -1) {
    //DEBUG
    //console.log("Entrer dans c'est une gratte");
    // On recupere le numero de corde
    var numero_corde_gratte = whoGratte(maGuitar, nomTouche);
    // On met dans le tableau le fait que la gratte est lancé
    historique_gratte[numero_corde_gratte] = true;
    // On lance la tempo pour laisse activé la gratte X secondes
    var maTempo = setTimeout(function () {
      historique_gratte[numero_corde_gratte] = false;
    }, 5000);
  }
  // Si la touche est une case
  if (whoCase(maGuitar, nomTouche) != -1) {
    //DEBUG
    //console.log("Entrer dans c'est une case");
    //On recupere le numero de corde
    var numero_corde_case = whoCase(maGuitar, nomTouche);
    // Si la gratte est active pour cette corde on fait le process d'envoi de l'objet
    if (historique_gratte[numero_corde_case] == true) {
      //DEBUG
      //console.log("Entrer dans c'est en gratte sur la corde on créer lobjet");
      //Affichage console de la note
      //console.log("un son a lancer sur la corde " + numero_corde_case + " avec la case " + nomTouche);
      // Objet de son
      var ObjectOneSon = new Object();
      ObjectOneSon.corde = numero_corde_case;
      ObjectOneSon.case = maGuitar.corde[numero_corde_case].case.indexOf(nomTouche);
      play_one_case(ObjectOneSon);
    }
  }
}, false);