// Jouer un son
function play_one_case(Son) {
  var sound = new Howl({
    src: ['/sound/piano/Corde_'+Son.corde+'_Case_'+Son.case+'.mp3']
  });
  sound.play();
  //console.log("Son : Corde "+Son.corde+" avec la case "+Son.corde);
}