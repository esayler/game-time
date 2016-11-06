function start(){
  canvas = document.getElementById("canvas1");
  bgCanvas = document.getElementById("canvas2");
  HUDCanvas = document.getElementById("canvas3");
  context = canvas.getContext("2d");
  bgContext = bgCanvas.getContext("2d");
  HUDContext = HUDCanvas.getContext("2d");
  vx = 0;
  vy = 0;
  gravity = Math.exp(.1);
  friction = .62;
  p1JumpHeld = false;
  p2JumpHeld = false;
  keys = new Keyboard();
  projectiles = [];
  players = [];
  platforms = [];
  jumpcount = 0;

  player1 = new Player("Cat", 300, "east");
  player2 = new Player("Dog", 900, "west");

  platforms.push(new Platform(-100, 580, 1450, 70, true));
  platforms.push(new Platform(530, 425, 335, 40, true));
  platforms.push(new Platform(572, 180, 420, 40, true));
  platforms.push(new Platform(215, 315, 225, 40, true));
  platforms.push(new Platform(0, 215, 147, 40,true));
  platforms.push(new Platform(1070, 332, 180, 40, true));
  platforms.push(new Platform(1175, 504, 75, 40, true));
  // platforms.push(new Platform(401, 503, 74, 40, true));
  platforms.push(new Platform(0, 400, 85, 40, true));

  players.push(player1);
  players.push(player2);

}
