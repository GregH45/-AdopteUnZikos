'use strict';

/**
 *  MAIN PROCESS
**/
window.onload = function () {

  var vid = document.getElementById('video'),
      // Affichage de la video
  overlay = document.getElementById('overlay'),
      // Affichage du mapping du visage
  webcam = new Webcam(vid),
      // Controleur de la Webcam
  trackr = new Trackr(); // Controler du tracking facial


  // Dessin du mapping
  function drawLoop() {
    var emotion = trackr.emotion,
        ctx = overlay.getContext('2d'),
        videoWidth = webcam.size[0],
        videoHeight = webcam.size[1];

    // Nouvelle frame
    requestAnimFrame(drawLoop);

    ctx.font = '20px sans-serif';
    overlay.width = videoWidth;
    overlay.height = videoHeight;

    // Dessin de tracking facial
    trackr.drawFace(overlay);

    // Affichage du score de tracking facial
    ctx.fillText(trackr.score, 10, videoHeight - 10);

    // Affichage de l'émotion
    if (emotion) {
      ctx.fillText(emotion.emotion, 10, videoHeight - 30);
    }
  }

  // Démarrage de la webcam de l'utilisateur
  webcam.startCamera();

  // Ajout de la webcam au tracker
  trackr.camera = webcam;

  // Lancement de l'affichage du mapping
  drawLoop();
};