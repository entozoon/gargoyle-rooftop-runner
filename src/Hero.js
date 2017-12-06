import Pixi from './PixiCreate';
import Collisions from './Collisions';

export class Hero {
  constructor() {
    this.gravity = 0.02;
    this.jumpVelocity = -0.8;
    this.velocity = { y: 0, x: 0.5 };
    this.floorAcceleration = 0.0001;
    this.maxVelocity = 1;
    this.temporaryTicker = 0;
    this.onFloor = false;
    this._dead = false;
    this.collisions = new Collisions();
    this._jumping = false;

    this.texture = new Pixi.engine.Texture.fromImage('./assets/hero.png').baseTexture;

    this.spriteSize = 50;

    this.spriteTextures = {};
    ['run', 'jump', 'dead'].forEach((pose, i) => {
      this.spriteTextures[pose] = new Pixi.engine.Texture(this.texture, {
        x: i * this.spriteSize,
        y: 0,
        width: this.spriteSize,
        height: this.spriteSize
      });
    });

    // Default, for a split second
    this.sprite = new Pixi.engine.Sprite(this.spriteTextures['jump']);

    Pixi.app.stage.addChild(this.sprite);

    this.x = Pixi.width * 0.1;
    this.y = 0;

    document.addEventListener('keydown', e => {
      // Space
      if (e.keyCode == 32 && !this.jumping) {
        e.preventDefault(); // brutal but, stop paging
        this.jumping = true;
      }
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode == 32) {
        this.jumping = false;
      }
    });
  }

  // I should really be currying this junk
  set y(value) {
    this.sprite.position.y = value;
  }
  set x(value) {
    this.sprite.position.x = value;
  }
  get y() {
    return this.sprite.position.y;
  }
  get x() {
    return this.sprite.position.x;
  }
  get width() {
    return this.sprite.width;
  }
  get height() {
    return this.sprite.height;
  }

  get dead() {
    return this._dead;
  }
  set dead(dead) {
    this._dead = dead;
    if (dead) {
      this.velocity.y = 0;
      this.velocity.x = 0;
      console.log('Game over');
    }
  }

  pose() {
    if (this.dead) {
      this._pose = 'dead';
    } else if (this.velocity.y < 0) {
      this._pose = 'jump';
    } else {
      this._pose = 'run';
    }

    this.sprite.texture = this.spriteTextures[this._pose];
  }

  get jumping() {
    return this._jumping;
  }

  set jumping(jumping) {
    this._jumping = jumping;

    if (jumping) {
      if (this.dead || !this.onFloor) return;
      this.velocity.y = this.jumpVelocity;
    } else if (this.velocity.y < 0) {
      // Halt jump
      // this.velocity.y = 0;
      // Slow jump right down
      let slowedVelocity = this;
      this.velocity.y *= 0.3;
    }
  }

  stopJump() {
    this.velocity.y = 0;
  }

  forces(dt) {
    // Hitting floor while moving downward = stop
    if (this.onFloor && this.velocity.y > 0) {
      this.velocity.y = 0;
      return;
    }

    this.velocity.y += this.gravity;
    this.y += this.velocity.y * dt;
  }

  // collisionHandler
  // @param  collection  e.g. Buildings
  collisionHandler(collection) {
    if (this.dead) return;

    this.onFloor = false;
    collection.forEach((building, i) => {
      // if (i > 0) return; // FORCE ONLY LEFTMOST BUILDING COLLISIONS - Optimisation

      if (this.collisions.isUnderfoot(this, building)) {
        this.onFloor = true;
        // If jaffing down to the floor, round into it
        if (this.velocity.y > 0) {
          this.y = building.y - this.height;
        }
      } else {
        if (
          // !this.onFloor &&
          this.collisions.smashingIntoObject(this, building) ||
          this.collisions.fallenThroughFloor(this)
        ) {
          this.dead = true;
        } else {
          // no floor underfoot of this particular object, not dead
        }
      }
    });
  }

  acceleration(dt) {
    if (this.onFloor && this.velocity.x < this.maxVelocity) {
      this.velocity.x += this.floorAcceleration * dt;
    }
  }

  update(dt) {
    // this.velocity.x = Math.sin(++this.temporaryTicker / 100) + 1;
    this.pose();
    this.forces(dt);
    this.acceleration(dt);
  }
}
