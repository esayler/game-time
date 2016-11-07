// import lolex from 'lolex';
import sinon from 'sinon';
import Player from '../lib/player'
import Game from '../lib/game'
import {
  platformCollisionCheck,
  playerCollisionCheck,
  projectileHitCheck
} from '../lib/collision'

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Collision Manager', function() {
  before(function() {
    // // runs before all tests in this block


  });

  beforeEach(function() {
    // runs before each test in this block
    // var p1 = new Player({});
    // var p2 = new Player({});
  });

  describe('platformCollisionCheck()', function() {
    context('if passThrough is false', function() {
      it('should stop a player from falling through a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: false })];
        let p1 = new Player({position: { x: 100, y: 100 }});
        // p1.size = { width: 45, height: 65 };
        platformCollisionCheck(p1, platforms);


      });

      it('should allow a player to pass through the bottom of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: false })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

      it('should allow a player to pass through the right side of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: false })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

      it('should allow a player to pass through the left side of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: false })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

    });


    context('if passThrough is true', function() {
      it('should stop a player from falling through a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: true })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

      it('should not allow a player to pass through the bottom of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: true })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

      it('should not allow a player to pass through the right side of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: true })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });

      it('should not allow a player to pass through the left side of a platform', function() {
        let platforms = [new Platform ({ x: 100, y: 100, width: 100, height: 100, passThrough: true })];
        let p1 = new Player({position: { x: 100, y: 100 }});

      });
    });


  });

  describe('playerCollisionCheck()', function() {


  });

  describe('projectileHitCheck()', function() {


  });



  context.skip('', function() {

  }

}
