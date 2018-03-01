'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Définition de la classe Webcam
 *  Cette classe permet de récupérer la webcam de l'utilisateur
 *  afin de l'afficher dans un élément HTMLVideo
**/
var Webcam = function () {

  /**
   *  Constructeur
   *  @param {HTMLVideo} Objet HTML video
  **/
  function Webcam(video) {
    _classCallCheck(this, Webcam);

    this._errorListener = [];
    this._video = video;
  }

  /**
   *  Getter de la taille de la video
   *  @return {int[]} Taille de la vidéo (width, height)
  **/


  _createClass(Webcam, [{
    key: 'adjustVideoProportions',


    /**
     *  Ré-ajustement de la taille de la vidéo
    **/
    value: function adjustVideoProportions() {
      var vid_height = this.size[1],
          proportion = this._video.videoWidth / this._video.videoHeight,
          vid_width = Math.round(vid_height * proportion);

      this._video.height = vid_height;
      this._video.width = vid_width;
    }

    /**
     *  Ajout d'un listener d'erreur pour le stream
     *  @param {Function} Callback appelé lors d'une erreur de stream
    **/

  }, {
    key: 'addErrorListener',
    value: function addErrorListener(listener) {
      this._errorListener.push(listener);
    }

    /**
     *  Démarrage de la webcam
    **/

  }, {
    key: 'startCamera',
    value: function startCamera() {
      var that = this;
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
          that.streamSuccess(stream);
        }).catch(function (e) {
          that.streamError(e);
        });
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, function (stream) {
          that.streamSuccess(stream);
        }, function (e) {
          that.streamError(e);
        });
      } else {
        streamError();
      }
    }

    /**
     *  Listener d'erreur de stream
     *  @param {Error} Objet d'erreur
    **/

  }, {
    key: 'streamError',
    value: function streamError(error) {
      console.log('No Input Webcam');
      console.log('Try to read Test Video');

      if (supports_video()) {
        var videoReaded = false;

        if (supports_webm_video()) {
          video.src = "/video/face_example.webm";
          videoReaded = true;
        } else if (supports_h264_baseline_video()) {
          video.src = "./video/face_example.mp4";
          videoReaded = true;
        }

        if (videoReaded) {
          var that = this;
          this._video.onresize = function () {
            that.adjustVideoProportions();

            that._errorListener.forEach(function (elt) {
              elt();
            });
          };
        }
      }
    }

    /**
     *  Listener du stream webcam
     *  @param {Stream} Flux de la vidéo
    **/

  }, {
    key: 'streamSuccess',
    value: function streamSuccess(stream) {
      if ("srcObject" in this._video) {
        this._video.srcObject = stream;
      } else {
        this._video.src = window.URL && window.URL.createObjectURL(stream);
      }

      var that = this;
      this._video.onloadedmetadata = function () {
        that.adjustVideoProportions();
        that._video.play();
      };

      this._video.onresize = function () {
        that.adjustVideoProportions();

        that._errorListener.forEach(function (elt) {
          elt();
        });
      };
    }
  }, {
    key: 'size',
    get: function get() {
      if (this._video.height && this._video.width) {
        return [this._video.width, this._video.height];
      }

      var vidStyle = undefined;
      if (window.getComputedStyle(this._video)) {
        vidStyle = window.getComputedStyle(this._video);
      } else if (this._video.currentStyle) {
        vidStyle = this._video.currentStyle;
      } else {
        vidStyle = this._video.style;
      }

      return [parseInt(vidStyle.width.split('px')[0]), parseInt(vidStyle.height.split('px')[0])];
    }

    /**
     *  Getter Objet HTMLVideo
     *  @return {HTMLVideo} Objet HTMLVideo
    **/

  }, {
    key: 'video',
    get: function get() {
      return this._video;
    }
  }]);

  return Webcam;
}();

/**
 *  Définition de la classe Trackr
 *  Cette classe permet le tracking du visage d'un utilisateur
 *  sur un flux video
**/


var Trackr = function () {

  /**
   *  Initialisation du tracker
  **/
  function Trackr() {
    _classCallCheck(this, Trackr);

    this._tracker = new clm.tracker();
    this._tracker.init();
  }

  /**
   *  Setter de la webcam
   *  @param {Webcam} Controler de webcam
  **/


  _createClass(Trackr, [{
    key: 'errorListener',


    /**
     *  Listener d'erreur de stream
    **/
    value: function errorListener() {
      this._tracker.stop();
      this._tracker.reset();
      this._tracker.start(this._webcam.video);
    }

    /**
     *  Dessin du mapping facial dans un canvas
     *  @param {HTMLCanvas} Canvas de dessin
    **/

  }, {
    key: 'drawFace',
    value: function drawFace(canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('2d');

      if (this._canvas && this._ctx) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (this._tracker.getCurrentPosition()) {
          this._tracker.draw(this._canvas);
          this._ctx.fillStyle = 'black';
        }
      }
    }

    /**
     *  Getter du score de tracking facial
     *  @return {float} Score
    **/

  }, {
    key: 'camera',
    set: function set(webcam) {
      this._webcam = webcam;

      this._tracker.start(this._webcam.video);

      this._emotionClassifier = new emotionClassifier();
      this._emotionClassifier.init(emotionModel);

      var that = this;
      this._webcam.addErrorListener(function () {
        that.errorListener();
      });
    }
  }, {
    key: 'score',
    get: function get() {
      return Math.round(this._tracker.getScore() * 1000) / 1000;
    }

    /**
     *  Getter d'émotion
     *  @return {Emotion} Emotion détecté
    **/

  }, {
    key: 'emotion',
    get: function get() {
      var cp = this._tracker.getCurrentParameters(),
          prediction = this._emotionClassifier.meanPredict(cp);

      if (prediction) {
        var max = undefined;

        for (var i = 0; i < prediction.length; i++) {
          if (max == undefined || prediction[i].value > 0.5 && prediction[i].value > max.value) {
            max = prediction[i];
          }
        }

        return max;
      }
    }
  }]);

  return Trackr;
}();