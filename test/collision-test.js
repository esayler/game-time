// import lolex from 'lolex';
import sinon from 'sinon';
import Player from '../lib/player'
import Game from '../lib/game'
import Platform from '../lib/platform'
import Keyboard from '../lib/keyboard'

import {
  platformCollisionCheck,
  playerCollisionCheck,
  projectileHitCheck
} from '../lib/collision'

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Collision Manager', function() {

  var kb = new Keyboard();
  var platforms;

  before(function() {
    // // runs before all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  describe('platformCollisionCheck()', function() {
    context('if passThrough is true', function() {
      it('should stop a player from falling through a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       100,
          height:      200,
          passThrough: true
        })];

        let playerMovingDown = new Player({
          position: { x: 150, y: 0 },
          velocity: { x: 0, y: 1 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingDown, platforms);
        collided.should.include(true);
        playerMovingDown.grounded.should.eql(true);
      });

      it('should allow a player to pass up through the bottom of a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       100,
          height:      200,
          passThrough: true
        })];

        let playerMovingUp = new Player({
          position: { x: 150, y: 300 },
          velocity: { x: 0, y: -1 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingUp, platforms);
        collided.should.include(true);
        playerMovingUp.grounded.should.eql(false);
        playerMovingUp.velocity.y.should.eql(-1);
      });

      it('should allow a player to pass through sideways the right side of a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       300,
          height:      200,
          passThrough: true
        })];

        let playerMovingWest = new Player({
          position: { x: 400, y: 200 },
          velocity: { x: -1, y: 0 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingWest, platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.eql(-1);
      });

      it('should allow a player to pass through sideways the left side of a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       300,
          height:      200,
          passThrough: true
        })];

        let playerMovingEast = new Player({
          position: { x: 50, y: 200 },
          velocity: { x: 1, y: 0 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingEast, platforms);
        collided.should.include(true);
        playerMovingEast.grounded.should.eql(false);
        playerMovingEast.velocity.x.should.eql(1);
      });

      it('should do nothing when player postion does not overlap platform', function() {

        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       300,
          height:      200,
          passThrough: true
        })];

        let playerMovingEast = new Player({
          position: { x: 0, y: 200 },
          velocity: { x: 1, y: 0 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });


        let collided = platformCollisionCheck(playerMovingEast, platforms);
        collided.should.not.include(true);
        playerMovingEast.grounded.should.eql(false);
        playerMovingEast.velocity.x.should.eql(1);

      });

    });


    context('if passThrough is false', function() {
      it('should not allow a player to fall through a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       100,
          height:      200,
          passThrough: false
        })];

        let playerMovingDown = new Player({
          position: { x: 150, y: 0 },
          velocity: { x: 0, y: 1 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingDown, platforms);
        collided.should.include(true);
        playerMovingDown.grounded.should.eql(true);
        playerMovingDown.position.should.not.change;

        // platformCollisionCheck(p1, platforms);


      });

      it('should not allow a player to pass through the bottom of a platform', function() {
        var platform = new Platform({
          x:           100,
          y:           100,
          width:       100,
          height:      200,
          passThrough: false
        });
        var platforms = [platform];

        let playerMovingUp = new Player({
          position: { x: 150, y: 300 },
          velocity: { x: 0, y: -1 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingUp, platforms);
        collided.should.include(true);
        playerMovingUp.grounded.should.eql(false);
        playerMovingUp.velocity.y.should.eql(0);
        playerMovingUp.position.y.should.eql(platform.height + platform.y);

      });

      it('should not allow a player to pass through the right side of a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       300,
          height:      200,
          passThrough: false
        })];

        let playerMovingWest = new Player({
          position: { x: 400, y: 200 },
          velocity: { x: -1, y: 0 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingWest, platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.change;
        playerMovingWest.position.should.not.change;

      });

      it('should not allow a player to pass through the left side of a platform', function() {
        var platforms = [new Platform({
          x:           100,
          y:           100,
          width:       300,
          height:      200,
          passThrough: true
        })];

        let playerMovingWest = new Player({
          position: { x: 50, y: 200 },
          velocity: { x: 1, y: 0 },
          size:     { width: 50, height: 100 },
          kb:       kb,
          grounded: false
        });

        let collided = platformCollisionCheck(playerMovingWest, platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.change;
        playerMovingWest.position.should.not.change;
      });
    });


  });

  // describe('playerCollisionCheck()', function() {
  //
  //
  // });
  //
  // describe('projectileHitCheck()', function() {
  //
  //
  // });



  // context.skip('', function() {
  //
  // }

});
