var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('image failed to load: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

Loader.loadMusic = function() {
  var actx = new (window.AudioContext || window.webkitAudioContext)();
  var soundBuffer;
  var request = new XMLHttpRequest();
  // request.open("GET", "../audio/tle-extended.mp3", true);
  request.open("GET", "../audio/loading-loop-0.wav", true);
  request.responseType = 'arraybuffer';
  request.send();

  function loadHandler(e) {
    console.log('audio-loadHandler');
    actx.decodeAudioData(request.response,
      buffer => { soundBuffer = buffer },
      error => { throw new Error("audio failed to load: " + error); });
  };
  request.addEventListener('load', loadHandler, false);
}

export { Loader };
