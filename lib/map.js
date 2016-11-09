import Platform from './platform';

let makePlatforms = (bg, mapNumber) =>  {

    let platforms = [];

    if (mapNumber === 0) {
      // Jungle Map
      platforms.push(new Platform({ fillStyle: 'rgba(103,58,183,1)',bgContext: (bg.ctxt), x: -100, y: 580, width: 1450, height: 70, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(255,152,0,1)', bgContext: (bg.ctxt), x: 530, y: 425, width: 335, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(0,150,136,1)', bgContext: (bg.ctxt), x: 572, y: 180, width: 420, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(205,220,57,1)',bgContext: (bg.ctxt), x: 215, y: 315, width: 225, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(233,30,99,1)', bgContext: (bg.ctxt), x: 0, y: 215, width: 147, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(33,150,243,1)', bgContext: (bg.ctxt), x: 1070, y: 332, width: 180, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(255,235,59,1)', bgContext: (bg.ctxt), x: 1175, y: 504, width: 75, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(63,81,181,1)', bgContext: (bg.ctxt), x: 0, y: 400, width: 85, height: 40, passThrough: true }));
    } else if (mapNumber === 1) {
      //Desert Map
      platforms.push(new Platform({ fillStyle: 'rgba(103,58,183,1)', bgContext: (bg.ctxt), x: -100, y: 580, width: 352, height: 70, passThrough: false }));
      platforms.push(new Platform({ fillStyle: 'rgba(255,152,0,1)', bgContext: (bg.ctxt), x: 499, y: 580, width: 250, height: 70, passThrough: false }));
      platforms.push(new Platform({ fillStyle: 'rgba(0,150,136,1)', bgContext: (bg.ctxt), x: 999, y: 580, width: 352, height: 70, passThrough: false }));
      platforms.push(new Platform({ fillStyle: 'rgba(205,220,57,1)', bgContext: (bg.ctxt), x: 213, y: 420, width: 312, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(233,30,99,1)', bgContext: (bg.ctxt), x: 724, y: 420, width: 312, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(33,150,243,1)', bgContext: (bg.ctxt), x: 403, y: 260, width: 442, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(255,235,59,1)', bgContext: (bg.ctxt), x: -100, y: 100, width: 250, height: 40, passThrough: true }));
      platforms.push(new Platform({ fillStyle: 'rgba(63,81,181,1)', bgContext: (bg.ctxt), x: 1100, y: 100, width: 250, height: 40, passThrough: true }));
    }

   return platforms;
}

let setBackground = (mapNumber, loader) => {
  var imagePrefix;
  if (mapNumber === 0) {
    imagePrefix = 'gameMap4';
  } else if (mapNumber === 1) {
    imagePrefix = 'gameMapDesert';
  }

  let url = 'url(images/' + imagePrefix + '.png)';
  document.getElementById('bg-layer').style.backgroundImage = url;

}



export { makePlatforms, setBackground }
