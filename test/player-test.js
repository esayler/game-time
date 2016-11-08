// import lolex from 'lolex';
import sinon from 'sinon';
import Player from '../lib/player'
import Game from '../lib/game'

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
// const sinon = require('sinon/pkg/sinon');

describe('Player', function() {
  before(function() {
    // var canvas = { fillRect: function() {}};
    // var spy = sinon.spy(canvas, "fillRect");
    // // runs before all tests in this block
    // var g = new Game(canvas);


  });

  beforeEach(function() {
    // runs before each test in this block
    // let game = sinon.createStubInstance(Game);

    // var canvas = { fillRect: function() {} };
    // var game = { constructor: function() {} };
    //
    // var spy = sinon.spy(game, "constructor");
    // var p1 = new Player({});
    // var p2 = new Player({});
  });

  it('should have a constructor', function() {
    // var p1 = new Player({});

    // expect(p1).to.be.a('Player');
    assert.isFunction(Player);
    // p1.should.be.a('Player');
    //;
  });

  context('on player creation', function() {

    it('should have an id', function() {
      var p1 = new Player({});
      p1.should.exist
      p1.id.should.eql(1);

    });
    it('should have a position "x" and "y"', function() {
      var p1 = new Player({});
      p1.should.exist;
      p1.position.should.exist;
      p1.position.should.include.keys('x');
      p1.position.x.should.eql(0);
      p1.position.should.include.keys('y');
      p1.position.y.should.eql(0);
    });
    it('should have an appropriate properties "width" and "height"', function() {
      var p1 = new Player({});
      p1.size.should.exist;
      p1.size.should.include.keys('width');
      p1.size.width.should.exist;
      p1.size.should.include.keys('height');
      p1.size.height.should.exist;
    });
    it('should start with no velocity', function() {
      var p1 = new Player({});
      p1.velocity.should.exist;
      p1.velocity.should.include.keys('x');
      p1.velocity.x.should.eql(0);
      p1.velocity.should.include.keys('y');
      p1.velocity.y.should.eql(0);
    });
    it('should start with a speed', function() {
      var p1 = new Player({});
      p1.speed.should.exist;
      p1.speed.should.be.at.least(2);
    });
  });

  context('while game is running', function() {
    describe('Player#jump()', function() {
      it('should be able to jump', function() {
        var p1 = new Player({});
        p1.jump.should.exist;
        // expect(p1.jump()).to.change(p1, p1.position.y);
        // p1.jump();
        // p1.position.y.should.
      });

      it('should be able to double jump while jumping', function() {
        var p1 = new Player({});
        p1.jump.should.exist;
        p1.jumping = true;
        p1.jump().should.be.ok;
      });

      it('should be not be able to triple jump', function() {
        var p1 = new Player({});
        p1.jump.should.exist;
        p1.jumping = false;
        p1.jump().should.be.ok;
        p1.jumping.should.be.true;
        p1.jumpcount.should.eql(1);
        p1.jump().should.be.ok;
        p1.jumpcount.should.eql(2);
        p1.jump().should.not.be.ok;
      });

      it.skip('should be not be able to jump repeatedly while holding down jump button', function() {
        //;
      });
    });

    describe('Player#draw()', function() {
      it.skip('should be drawn to the canvas', function() {
        var p1 = new Player({});
      });

    });

    describe('Player#left()', function() {
      it('should be able to move left()', function() {
        var p1 = new Player({position: { x: 100, y: 100}});
        p1.left();
        p1.position.x.should.decrease;
      });

    });

    describe('Player#right()', function() {
      it('should be able to move right', function() {
        var p1 = new Player({});
        var p1 = new Player({ position: { x: 100, y: 100} });
        p1.right();
        p1.position.x.should.increase;
      });

    });

    describe('Player#shoot()', function() {
      it('should be able to shoot bullets', function() {
        var g = new Game({});
        var p1 = new Player({});
        p1.shoot();
        p1.bullets.should.have.length.of.at.least(1);

      });

      it('should be not be able to shoot right after shooting a bullet', function() {
        var p1 = new Player({});
        p1.shoot().should.be.ok;
        p1.bullets.should.have.length.of.at.least(1);
        p1.shoot().should.not.be.ok;
        p1.bullets.should.not.change;

      });
    });

    describe('Player#update()', function() {
      //TODO: decouple keyboard from player update function()
      it.skip('should update player position', function() {
        var p1 = new Player({ position: { x: 100, y: 100} });
        p1.update().should.change(p1, p1.position.y);
        // p1.position.y.should.change;
      });

      it.skip('should prevent player from moving off the map', function() {
        var p1 = new Player({});
      });

    });
  });
});
