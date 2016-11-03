const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

import Player from '../lib/player'
import Game from '../lib/game'

describe('Player', function() {
  before(function() {
    // runs before all tests in this block
    var g = new Game('canvas');
  });

  beforeEach(function() {
    // runs before each test in this block
    var p1 = new Player(g, 1);
    var p2 = new Player(g, 2);
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
