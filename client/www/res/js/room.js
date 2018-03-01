"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StickMan = function () {
	function StickMan() {
		_classCallCheck(this, StickMan);

		this.guitar = undefined;
		this.tongue = undefined;
		this.fire = undefined;
		this.mouth = undefined;

		this._hand = 3;
		this._head = 0;
		this._headbangPlayed = false;
		this._playPlayed = false;
		this._singPlayed = false;
		this._tonguePlayed = false;
		this._firePlayed = false;
	}

	_createClass(StickMan, [{
		key: "draw",
		value: function draw() {
			// Draw background
			if (this._firePlayed && this.fire) {
				background(this.fire);
			} else {
				background(155);
			}
			noStroke(0);
			fill(0, 0, 0);

			var c = color(255, 205, 148);
			fill(c);
			noStroke();

			// Draw Stickman
			// Left Leg
			rect(200 - 5 * 10, 200 + 25 * 10, 4 * 10, 20 * 10);
			// Right Leg
			rect(200 + 1 * 10, 200 + 25 * 10, 4 * 10, 20 * 10);

			// Right Arms
			rect(200, 200 + 15 * 10 / 2, 20 * 10, 4 * 10);
			push();
			var aze = color(0, 0, 0);
			fill(aze);
			noStroke();
			rect(200, 200 + 15 * 10 / 2, 7 * 10, 4 * 10);
			// Bassin ?
			rect(200 - 5 * 10, 200 + 25 * 10, 10 * 10, 4 * 10);

			//Chest
			rect(200 - 2 * 10, 200 + 5 * 10, 4 * 10, 20 * 10);

			//PANTALON
			rect(200 - 5 * 10, 200 + 25 * 10, 4 * 10, 20 * 10);
			rect(200 + 1 * 10, 200 + 25 * 10, 4 * 10, 20 * 10);
			pop();

			// Gratte
			push();
			translate(200, 200);
			image(this.guitar, -150, 50, this.guitar.width / 2, this.guitar.height / 2);
			pop();

			//left arm
			push();
			frameRate(30);
			translate(200, 200 + 15 * 10 / 2);
			rotate(PI / this._hand);
			rect(0, 0, 20 * 7, 4 * 10);
			var aze = color(0, 0, 0);
			fill(aze);
			noStroke();
			rect(0, 0, 10 * 6, 4 * 10);
			pop();

			// MOTHER FUCKING HEADBANG + head
			push();
			frameRate(5);
			ellipse(200 + this._head, 200 + this._head, 20 * 10, 20 * 10);

			// EYES
			var c = color(255, 255, 255);

			fill(c);
			noStroke();
			ellipse(250 + this._head, 170 + this._head, 30, 20);
			ellipse(150 + this._head, 170 + this._head, 30, 20);

			c = color(0, 0, 0);
			fill(c);
			ellipse(250 + this._head, 170 + this._head, 10, 10);
			ellipse(150 + this._head, 170 + this._head, 10, 10);

			// TONGUE
			if (this._tonguePlayed && this.tongue) {
				image(this.tongue, 150 + this._head, 250 + this._head, this.tongue.width / 2, this.tongue.height / 2);
			}

			// MOUTH
			else if (this._singPlayed && this.mouth) {
					image(this.mouth, 150 + this._head, 210 + this._head, this.mouth.width / 3, this.mouth.height / 3);
				} else {
					var c = color(255, 0, 0);
					fill(c);
					noStroke();
					ellipse(200 + this._head, 250 + this._head, 60, 20);
				}
			pop();

			// Headbang var switch
			if (this._headbangPlayed) {
				this._head = this._head == 0 ? this._head = 50 : this._head = 0;
			} else {
				this._head = 0;
			}

			// Play guitar var switch
			if (this._playPlayed) {
				this._hand = this._hand == 3 ? this._hand = 2.7 : this._hand = 3;
			} else {
				this._hand = 3;
			}
		}
	}, {
		key: "playHeadbang",
		value: function playHeadbang() {
			this._headbangPlayed = true;
		}
	}, {
		key: "stopHeadbang",
		value: function stopHeadbang() {
			this._headbangPlayed = false;
		}
	}, {
		key: "playGuitar",
		value: function playGuitar() {
			this._playPlayed = true;
		}
	}, {
		key: "stopGuitar",
		value: function stopGuitar() {
			this._playPlayed = false;
		}
	}, {
		key: "sing",
		value: function sing() {
			this._singPlayed = true;
		}
	}, {
		key: "stopSinging",
		value: function stopSinging() {
			this._singPlayed = false;
		}
	}, {
		key: "pullOutTongue",
		value: function pullOutTongue() {
			this._tonguePlayed = true;
		}
	}, {
		key: "pullInTongue",
		value: function pullInTongue() {
			this._tonguePlayed = false;
		}
	}, {
		key: "onFire",
		value: function onFire() {
			this._firePlayed = true;
		}
	}, {
		key: "stopFire",
		value: function stopFire() {
			this._firePlayed = false;
		}
	}]);

	return StickMan;
}();

var man = new StickMan();

function setup() {
	man.guitar = loadImage("/img/guitar.png");
	man.tongue = loadImage("/img/tongue.png");
	man.fire = loadImage("/img/fire.jpg");
	man.mouth = loadImage("/img/mouth.png");

	createCanvas(window.windowWidth, window.windowHeight);
}

function draw() {
	man.draw();
}

(function () {

	var allowToSinging = true;
	function playSinging() {
		if (allowToSinging) {
			setTimeout(function () {
				man.sing();

				setTimeout(function () {
					man.stopSinging();
					playSinging();
				}, 200);
			}, 70);
		} else {
			allowToSinging = true;
		}
	}

	function stopSinging() {
		allowToSinging = false;
	}

	function stopGuitar() {
		man.stopGuitar();
	}

	function playGuitar() {
		man.playGuitar();

		setTimeout(function () {
			man.stopGuitar();
		}, 200);
	}

	function startHeadbang() {
		man.playHeadbang();
	}

	function stopHeadbang() {
		man.stopHeadbang();
	}

	function startFire() {
		man.onFire();
	}

	function stopFire() {
		man.stopFire();
	}

	function pullOutTongue() {
		man.pullOutTongue();
	}

	function pullInTongue() {
		man.pullInTongue();
	}

	$(document).ready(function () {

		var vid = document.getElementById('video'),
		    // Affichage de la video
		webcam = new Webcam(vid),
		    // Controleur de la Webcam
		trackr = new Trackr(); // Controler du tracking facial


		App.userLoaded(function () {
			if (!App.User.name) {
				window.location = 'index.html';
			}

			if (App.User.star) {
				var testEmotion = function testEmotion() {
					if (!isSurprised && trackr.emotion && trackr.emotion.emotion === 'surprised') {
						App.Messenger.sendMessage('play', { type: 'tongue' });
						isSurprised = true;
					} else if (isSurprised) {
						App.Messenger.sendMessage('play', { type: 'tongue', stop: true });
						isSurprised = false;
					}

					if (!isAngry && trackr.emotion && trackr.emotion.emotion === 'angry') {
						App.Messenger.sendMessage('play', { type: 'headbang' });
						isAngry = true;
					} else if (isAngry) {
						App.Messenger.sendMessage('play', { type: 'headbang', stop: true });
						isAngry = false;
					}

					requestAnimFrame(testEmotion);
				};

				// Envoi des sockets


				// Démarrage de la webcam de l'utilisateur
				webcam.startCamera();

				// Ajout de la webcam au tracker
				trackr.camera = webcam;

				var isSurprised = false,
				    isAngry = false;
				App.Messenger.sendMessage('play', { type: 'sing' });
				testEmotion();
			}

			// Ecoute des sockets
			App.Messenger.listenMessage('play', function (obj) {
				switch (obj.type) {
					case 'sing':
						if (obj.stop) {
							stopSinging();
						} else {
							playSinging();
						}
						break;

					case 'play':
						if (obj.stop) {
							//stopGuitar();
						} else {
							playGuitar();
							play_one_case(obj);
						}
						break;

					case 'headbang':
						if (obj.stop) {
							stopHeadbang();
						} else {
							startHeadbang();
						}
						break;

					case 'fire':
						if (obj.stop) {
							stopFire();
						} else {
							startFire();
						}
						break;

					case 'tongue':
						if (obj.stop) {
							pullInTongue();
						} else {
							pullOutTongue();
						}
						break;
				}
			});
		});
	});
})();