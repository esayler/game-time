
export default class Platform {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.passThrough = options.passThrough || false;
    this.bgContext = options.bg.ctxt;
    this.fillStyle = options.fillStyle;

    // Object.assign(this, options);
  }

  draw(){

    this.bgContext.fillStyle = this.fillStyle;
    this.bgContext.globalAlpha = 0.8;
    this.bgContext.fillRect(this.x, this.y, this.width, this.height);
  }

}
