export default class TileMap {
  constructor() {
    this.tileAtlas = new Image();
    this.tileAtlas.src = "/lib/images/tiles_spritesheet.png";
    this.map = {
      cols: 18,
      rows: 9,
      tsize: 70,
      layers: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 69, 57, 57, 57, 45, 0, 0, 0, 0, 69, 57, 57, 57, 45, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
      ]
    };
    //tiles: [
    //1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10, 11, 12, 1 , 1 , 1 , 1 , 1 , 1 ,
    //13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1 , 1 , 1 , 1 , 1 , 1 ,
    //25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 1 , 1 , 1 , 1 , 1 , 1 ,
    //37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 1 , 1 , 1 , 1 , 1 , 1 ,
    //49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 1 , 1 , 1 , 1 , 1 , 1 ,
    //61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 1 , 1 , 1 , 1 , 1 , 1 ,
    //73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 1 , 1 , 1 , 1 , 1 , 1 ,
    //85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 1 , 1 , 1 , 1 , 1 , 1 ,
    //97, 98, 99,100,101,102,103,104,105,106,106,107, 1 , 1 , 1 , 1 , 1 , 1
    //],
    // tile-map
  }

  getTile(layer, col, row) {
    return this.map.layers[layer][row * this.map.cols + col];
    console.log('getTile');
  }

}


// var map = {
//   cols: 18,
//   rows: 9,
//   tsize: 70,
//   tiles: [
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     0 , 0 , 69 , 57 , 57 , 57 , 45 , 0 , 0 , 0 , 0 , 69 , 57 , 57 , 57 , 45 , 0 , 0 ,
//     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
//     104, 104, 104,104,104,104,104,104,104,104,104,104, 104 , 104 , 104 , 104 , 104 , 104
//   ],
//   getTile: function(col, row) {
//     return this.tiles[row * map.cols + col]
//   }
// };

//
//
// Game.render = function () {
//     // draw map background layer
//     this._drawLayer(0);
//     // draw game sprites
//     this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
//     // draw map top layer
//     this._drawLayer(1);
// };
//
//   function renderMap(tileAtlas) {
//     console.log('render');
//     for (var c = 0; c < map.cols; c++) {
//       for (var r = 0; r < map.rows; r++) {
//         var tile = map.getTile(c, r);
//         if (tile !== 0) { // 0 => empty tile
//           context.drawImage(
//             tileAtlas, // image
//             (((tile - 1) % 12) * (map.tsize + 2)), // source x
//             (Math.floor((tile - 1)/12) * (map.tsize + 2)), // source y
//             map.tsize, // source width
//             map.tsize, // source height
//             c * map.tsize, // target x
//             r * map.tsize, // target y
//             map.tsize, // target width
//             map.tsize // target height
//           );
//         }
//       }
//     }
//   }
// }
//
//

//
// window.onload = function(){
//   var tileAtlas = new Image();
//   tileAtlas.src = "/lib/assets/tiles_spritesheet.png";
//
//   //Loader.loadImage('tiles', './assets/tiles_spritesheet.png');
//   //var tileAtlas = Loader.getImage('tiles');
//   renderMap(tileAtlas);
//
// }
