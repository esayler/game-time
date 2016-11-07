import Platform from './platform'

let imageArray = [{
  label: 'itemTiles',
  src: '../images/forest-items-sprite-0.png'
}, {
  label: 'mapTiles',
  src: '../images/forest-items-sprite-0.png'
}, {
  label: 'CatDeadLeft',
  src: '../images/cat-dog-tileset/CatDeadLeft.png'
}, {
  label: 'CatDeadRight',
  src: '../images/cat-dog-tileset/CatDeadRight.png'
}, {
  label: 'CatFallLeft',
  src: '../images/cat-dog-tileset/CatFallLeft.png'
}, {
  label: 'CatFallRight',
  src: '../images/cat-dog-tileset/CatFallRight.png'
}, {
  label: 'CatIdleLeft',
  src: '../images/cat-dog-tileset/CatIdleLeft.png'
}, {
  label: 'CatIdleRight',
  src: '../images/cat-dog-tileset/CatIdleRight.png'
}, {
  label: 'CatJumpLeft',
  src: '../images/cat-dog-tileset/CatJumpLeft.png'
}, {
  label: 'CatJumpRight',
  src: '../images/cat-dog-tileset/CatJumpRight.png'
}, {
  label: 'CatRunLeft',
  src: '../images/cat-dog-tileset/CatRunLeft.png'
}, {
  label: 'CatRunRight',
  src: '../images/cat-dog-tileset/CatRunRight.png'
}, {
  label: 'CatStunnedLeft',
  src: '../images/cat-dog-tileset/CatStunnedLeft.png'
}, {
  label: 'CatStunnedRight',
  src: '../images/cat-dog-tileset/CatStunnedRight.png'
}, {
  label: 'DogDeadLeft',
  src: '../images/cat-dog-tileset/DogDeadLeft.png'
}, {
  label: 'DogDeadRight',
  src: '../images/cat-dog-tileset/DogDeadRight.png'
}, {
  label: 'DogFallLeft',
  src: '../images/cat-dog-tileset/DogFallLeft.png'
}, {
  label: 'DogFallRight',
  src: '../images/cat-dog-tileset/DogFallRight.png'
}, {
  label: 'DogIdleLeft',
  src: '../images/cat-dog-tileset/DogIdleLeft.png'
}, {
  label: 'DogIdleRight',
  src: '../images/cat-dog-tileset/DogIdleRight.png'
}, {
  label: 'DogJumpLeft',
  src: '../images/cat-dog-tileset/DogJumpLeft.png'
}, {
  label: 'DogJumpRight',
  src: '../images/cat-dog-tileset/DogJumpRight.png'
}, {
  label: 'DogRunLeft',
  src: '../images/cat-dog-tileset/DogRunLeft.png'
}, {
  label: 'DogRunRight',
  src: '../images/cat-dog-tileset/DogRunRight.png'
}, {
  label: 'DogStunnedLeft',
  src: '../images/cat-dog-tileset/DogStunnedLeft.png'
}, {
  label: 'DogStunnedRight',
  src: '../images/cat-dog-tileset/DogStunnedRight.png'
}, {
  label: 'tennisBall',
  src: '../images/cat-dog-tileset/tennisBall.png'
}, {
  label: 'yarnBall',
  src: '../images/cat-dog-tileset/yarnBall.png'
}]

let soundArray = [


]

let makePlatforms = (bg) =>  {

    let platforms = [];
    platforms.push(new Platform({ fillStyle : 'rgba(103,58,183,1)',bgContext  : (bg.ctxt), x: 0, y   : 570, width: 1250, height: 70, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,152,0,1)', bgContext  : (bg.ctxt), x: 520, y : 180, width: 400, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(0,150,136,1)', bgContext  : (bg.ctxt), x: 165, y : 315, width: 220, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(158,158,158,1)',bgContext : (bg.ctxt), x: 475, y : 420, width: 325, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(233,30,99,1)', bgContext  : (bg.ctxt), x: 0, y   : 214, width: 95,  height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(33,150,243,1)', bgContext : (bg.ctxt), x: 1010, y: 330, width: 225, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,235,59,1)', bgContext : (bg.ctxt), x: 1175, y: 504, width: 75, height  : 40, passThrough: false }));
    platforms.push(new Platform({ fillStyle : 'rgba(205,220,57,1)', bgContext : (bg.ctxt), x: 1073, y: 535, width: 80, height  : 38, passThrough: false }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,193,7,1)', bgContext  : (bg.ctxt), x: 1110, y: 497, width: 40, height  : 38, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(76,175,80,1)', bgContext  : (bg.ctxt), x: 685, y : 382, width: 35, height  : 40, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(63,81,181,1)', bgContext  : (bg.ctxt), x: 648, y : 382, width: 35, height  : 40, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(244,67,54,1)', bgContext  : (bg.ctxt), x: 0, y   : 400, width: 35, height  : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(3,169,244,1)', bgContext  : (bg.ctxt), x: 688, y : 140, width: 36, height  : 40, passThrough: true }));

   return platforms;
}

export { imageArray, soundArray, makePlatforms }
