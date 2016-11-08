import sinon from 'sinon';
import Player from '../lib/player';

describe('Player', function() {
  beforeEach(function() {
    this.p1 = new Player({});
  });

  it('should have a constructor', function() {
    Player.should.be.a.function;
  });

  context('on player creation', function() {
    it('should have an id', function() {
      this.p1.should.exist();
      this.p1.id.should.eql(1);
    });

    it('should have a position "x" and "y"', function() {
      this.p1.should.exist();
      this.p1.position.should.exist();
      this.p1.position.should.include.keys('x');
      this.p1.position.x.should.eql(0);
      this.p1.position.should.include.keys('y');
      this.p1.position.y.should.eql(0);
    });

    it('should have an appropriate properties "width" and "height"', function() {
      this.p1.size.should.exist();
      this.p1.size.should.include.keys('width');
      this.p1.size.width.should.exist();
      this.p1.size.should.include.keys('height');
      this.p1.size.height.should.exist();
    });

    it('should start with no velocity', function() {
      this.p1.velocity.should.exist();
      this.p1.velocity.should.include.keys('x');
      this.p1.velocity.x.should.eql(0);
      this.p1.velocity.should.include.keys('y');
      this.p1.velocity.y.should.eql(0);
    });
    it('should start with a speed', function() {
      this.p1.speed.should.exist();
      this.p1.speed.should.be.at.least(2);
    });
  });

  context('while game is running', function() {
    describe('Player#jump()', function() {
      it('should be able to jump', function() {
        this.p1.jump.should.exist();
        this.p1.jump().should.be.ok();
      });

      it('should be able to double jump while jumping', function() {
        this.p1.jump.should.exist();
        this.p1.jumping = true;
        this.p1.jump().should.be.ok();
      });

      it('should be not be able to triple jump', function() {
        this.p1.jump.should.exist();
        this.p1.jumping = false;
        this.p1.jump().should.be.ok();
        this.p1.jumping.should.be.true();
        this.p1.jumpcount.should.eql(1);
        this.p1.jump().should.be.ok();
        this.p1.jumpcount.should.eql(2);
        this.p1.jump().should.not.be.ok();
      });

      it('should be not be able to jump repeatedly while holding down jump button');
    });

    describe('Player#draw()', function() {
      it('should be drawn to the canvas');
    });

    describe('Player#left()', function() {
      it('should be able to move left()', function() {
        this.p1.position = { x: 100, y: 100 };
        this.p1.left();
        this.p1.position.x.should.decrease;
      });
    });

    describe('Player#right()', function() {
      it('should be able to move right', function() {
        this.p1.position = { x: 100, y: 100 };
        this.p1.right();
        this.p1.position.x.should.increase;
      });
    });

    describe('Player#shoot()', function() {
      it('should be able to shoot bullets', function() {
        this.p1.shoot();
        this.p1.bullets.should.have.length.of.at.least(1);
      });

      it('should be not be able to shoot right after shooting a bullet', function() {
        this.p1.shoot().should.be.ok();
        this.p1.bullets.should.have.length.of.at.least(1);
        this.p1.shoot().should.not.be.ok();
        this.p1.bullets.should.not.change;
      });
    });

    describe('Player#update()', function() {
      //TODO: decouple keyboard from player update function() or mock/spy isDown/isUp
      it.skip('should update player position', function() {
        this.p1.position = { x: 100, y: 100};
        this.p1.update().should.change(this.p1, this.p1.position.y);
      });

      it('should prevent player from moving off the map');
    });
  });
});
