// Classe clavier 
class keyboard {
  constructor(Keyboard) {
    this.keytemplate = Keyboard;
  }
  guitarGen(nbCorde) {
    if (nbCorde > 12) {
      //console.log("Nombre max de corde est 12");
      nbCorde = 12
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
}