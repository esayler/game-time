// var actx = new (window.AudioContext || window.webkitAudioContext)();

let menuMusic = ((actx) => {
  var menuMusicNode;
  var menuMusicStarted = false;

  return {
    play: () => {
      if (!menuMusicStarted) {
        menuMusicStarted = true;
        var gainNode = actx.createGain();
        menuMusicNode = actx.createBufferSource();
        menuMusicNode.connect(gainNode);
        let musicBuffer = loader.sounds['startScreenMusic'];
        menuMusicNode.buffer = musicBuffer;
        gainNode.connect(actx.destination);
        gainNode.gain.value = 1.35;
        menuMusicNode.loop = true;
        menuMusicNode.start();
      }
    },
    stop: () => {
      if (menuMusicNode) {
        menuMusicNode.stop();
        menuMusicStarted = false;
      }
    }
  };
})(actx);

export { menuMusic };
