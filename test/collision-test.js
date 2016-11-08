import sinon from 'sinon';
import Player from '../lib/player'
import Game from '../lib/game'
import Platform from '../lib/platform'
import Keyboard from '../lib/keyboard'
import Bullet from '../lib/bullet'
import { platformCollisionCheck, playerCollisionCheck, projectileHitCheck } from '../lib/collision'

// var expect = chai.expect
// ...
// expect(true).to.be.true();
describe('Collision Manager', function() {

  before(function() {
    this.kb = new Keyboard();
  });

  describe('platformCollisionCheck()', function() {
    beforeEach(function() {
      this.platforms = [new Platform({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        passThrough: true,
      })];

      this.p1 = new Player({
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        size: { width: 50, height: 100 },
        kb: this.kb,
        grounded: false,
      });
    });
    context('if passThrough is true', function() {
      it('should stop a player from falling through a platform', function() {
        this.platforms[0].passThrough = true;
        this.p1.position = { x: 150, y: 0 };
        this.p1.velocity = { x: 0, y: 1 }
        const playerMovingDown = this.p1;
        const collided = platformCollisionCheck(playerMovingDown, this.platforms);
        collided.should.include(true);
        playerMovingDown.grounded.should.be.true();
      });

      it('should allow a player to pass up through the bottom of a platform', function() {
        this.p1.position = { x: 150, y: 300 };
        this.p1.velocity = { x: 0, y: -1 };
        const playerMovingUp = this.p1;
        const collided = platformCollisionCheck(playerMovingUp, this.platforms);
        collided.should.include(true);
        playerMovingUp.grounded.should.eql(false);
        playerMovingUp.velocity.y.should.eql(-1);
      });

      it('should allow a player to pass through sideways the right side of a platform', function() {
        this.p1.position = { x: 50, y: 200 };
        this.p1.velocity = { x: 1, y: 0 };
        const playerMovingWest = this.p1;
        const collided = platformCollisionCheck(playerMovingWest, this.platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.eql(1);
      });

      it('should allow a player to pass through sideways the left side of a platform', function() {
        this.p1.position = { x: 400, y: 200 };
        this.p1.velocity = { x: -1, y: 0 };
        const playerMovingEast = this.p1;
        const collided = platformCollisionCheck(playerMovingEast, this.platforms);
        collided.should.include(true);
        playerMovingEast.grounded.should.eql(false);
        playerMovingEast.velocity.x.should.eql(-1);
      });

      it('should do nothing when player postion does not overlap platform', function() {
        this.p1.position = { x: 0, y: 200 };
        this.p1.velocity = { x: 1, y: 0 };
        const playerMovingEast = this.p1;

        const collided = platformCollisionCheck(playerMovingEast, this.platforms);
        collided.should.not.include(true);
        playerMovingEast.grounded.should.eql(false);
        playerMovingEast.velocity.x.should.eql(1);
      });
    });

    context('if passThrough is false', function() {
      beforeEach(function() {
        this.platforms.forEach(platform => platform.passThrough = false);
        // this.platforms[0].passThrough = false;
      });

      it('should not allow a player to fall through a platform', function() {
        this.p1.position = { x: 150, y: 0 };
        this.p1.velocity = { x: 0, y: 1 };
        const playerMovingDown = this.p1;

        const collided = platformCollisionCheck(playerMovingDown, this.platforms);
        collided.should.include(true);
        playerMovingDown.grounded.should.be.true();
        playerMovingDown.position.should.not.change;

        // platformCollisionCheck(p1, platforms);
      });

      it('should not allow a player to pass through the bottom of a platform', function() {
        this.p1.position = { x: 300, y: 200 };
        this.p1.velocity = { x: 0, y: -1 };
        const playerMovingUp = this.p1;

        const collided = platformCollisionCheck(playerMovingUp, this.platforms);
        collided.should.include(true);
        // playerMovingUp.grounded.should.eql(false);
        playerMovingUp.velocity.y.should.eql(0);
        playerMovingUp.position.y.should.eql(this.platforms[0].height + this.platforms[0].y);

      });

      it('should not allow a player to pass through the right side of a platform', function() {
        this.p1.position = { x: 400, y: 200 };
        this.p1.velocity = { x: -1, y: 0 };
        const playerMovingWest = this.p1;

        const collided = platformCollisionCheck(playerMovingWest, this.platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.change;
        playerMovingWest.position.should.not.change;
      });

      it('should not allow a player to pass through the left side of a platform', function() {
        this.p1.position = { x: 50, y: 200 };
        this.p1.velocity = { x: 1, y: 0 };
        const playerMovingWest = this.p1;

        const collided = platformCollisionCheck(playerMovingWest, this.platforms);
        collided.should.include(true);
        playerMovingWest.grounded.should.eql(false);
        playerMovingWest.velocity.x.should.decrease;
        playerMovingWest.position.should.not.change;
      });
    });
  });

  describe('playerCollisionCheck()', function() {
    beforeEach(function() {
      this.players = [];
      this.players[0] = new Player({
        position: { x: 500, y: 500 },
        velocity: { x: 0, y: 0 },
        size: { width: 50, height: 100 },
        kb: this.kb,
        facing: 'east',
      });

      this.players[1] = new Player({
        position: { x: 550, y: 500 },
        velocity: { x: 0, y: 0 },
        size: { width: 50, height: 100 },
        kb: this.kb,
        facing: 'west',
      });
    });

    it('should be a function', function() {
      playerCollisionCheck.should.exist();
      playerCollisionCheck.should.be.a.function;
    });

    it('should allow a player to run through another player\'s right side', function() {
      this.players[0].right();
      const collided = playerCollisionCheck(this.players);
      collided.should.be.false();
      this.players[1].position.should.not.change;
      this.players[0].position.x.should.increase;
    });

    it('should allow a player to run through another player\'s left side', function() {
      this.players[1].left();
      const collided = playerCollisionCheck(this.players);
      this.players[0].position.should.not.change;
      this.players[1].position.x.should.decrease;
      collided.should.be.false();
    });

    it('should allow a player to jump up through the bottom of another player', function() {
      this.players[0].position = { x: 500, y: 500 };
      this.players[1].position = { x: 500, y: 450 };

      this.players[0].jump();
      const collided = playerCollisionCheck(this.players);
      this.players[1].position.should.not.change;
      this.players[0].position.x.should.increase;
      collided.should.be.false();
    });

    it('should not allow a player to fall through the top of another player', function() {
      this.players[0].position = { x: 500, y: 500 };
      this.players[0].velocity = { x: 0, y: 1 }
      this.players[1].position = { x: 500, y: 550 };

      const collided = playerCollisionCheck(this.players);
      collided.should.be.true();
      this.players[0].position.y.should.not.decrease;
    });

    it('should bounce a player off another player\'s head', function() {
      this.players[0].position = { x: 500, y: 500 };
      this.players[0].velocity = { x: 0, y: 1 }
      this.players[1].position = { x: 500, y: 550 };

      const collided = playerCollisionCheck(this.players);
      this.players[0].position.y.should.decrease;
      this.players[0].position.x.should.change;
    });

    it('should register a kill when a player lands on top of another player', function() {
      this.players[0].position = { x: 500, y: 500 };
      this.players[0].velocity = { x: 0, y: 1 }
      this.players[1].position = { x: 500, y: 550 };
      this.players[1].dead.should.be.false();

      const collided = playerCollisionCheck(this.players);
      this.players[1].dead.should.be.true();
    });
  });

  describe('projectileHitCheck()', function() {
    beforeEach(function() {
      this.players = [];
      this.players[0] = new Player({
        position: { x: 500, y: 500 },
        velocity: { x: 0, y: 0 },
        size: { width: 50, height: 100 },
        kb: this.kb,
        facing: 'east',
      });

      this.players[1] = new Player({
        position: { x: 650, y: 500 },
        velocity: { x: 0, y: 0 },
        size: { width: 50, height: 100 },
        kb: this.kb,
        facing: 'west',
      });
    });

    it('should be a function', function() {
      projectileHitCheck.should.exist();
      projectileHitCheck.should.be.a.function;
    });

    it('return an empty array if no bullets exist', function() {
      const hits = projectileHitCheck(this.players);
      hits.should.be.empty();
    });

    it('return an array of false values non-colliding bullets exist', function() {
      this.players[0].facing = 'west';
      this.players[1].facing = 'west';

      this.players[0].shoot();
      this.players[1].shoot();

      this.players[0].bullets.should.have.length.of.at.least(1);
      this.players[1].bullets.should.have.length.of.at.least(1);
      const hits = projectileHitCheck(this.players);
      hits.should.not.be.empty();
      hits.should.not.include(true);
    });

    it('should return an array with one true value if a bullet hit occurs', function() {
      this.players[0].position = this.players[1].position;

      this.players[0].shoot();
      this.players[0].bullets.should.have.length.of.at.least(1);
      const hits = projectileHitCheck(this.players);
      hits.should.not.be.empty();
      hits.should.include(true);
      this.players[0].stunned.should.be.false();
      this.players[1].stunned.should.be.true();
    });
  });
});
