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
    var game = { constructor: function() {} };

    var spy = sinon.spy(game, "constructor");

    var p1 = new Player(game, 1);
    var p2 = new Player(game, 2);
  });

  it('should have a constructor', function() {
    expect(p1).to.be.a('Player');
    p1.should.be.a('Player');
    //;
  });

  context('on player creation', function() {

    it.skip('should have an id', function() {
      //;
    });
    it.skip('should have a property "x"', function() {
      //;
    });
    it.skip('should have a property "y"', function() {
      //;
    });
    it.skip('should have an appropriate property "width"', function() {
      //;
    });
    it.skip('should have an appropriate property "height"', function() {
      //;
    });
    it.skip('should start with no velocity', function() {
      //;
    });
    it.skip('should start with a speed', function() {
      //;
    });
  });

  context('while game is running', function() {
    describe.skip('Player#jump()', function() {
      it.skip('should be a function', function() {
        //;
      });
      it.skip('should be able to jump', function() {
        //;
      });
      it.skip('should be not be able to jump while jumping', function() {
        //;
      });
      it.skip('should be not be able to jump repeatedly while holding down jump button', function() {
        //;
      });
    });
  });
});
