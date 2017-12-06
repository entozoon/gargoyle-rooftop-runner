import Pixi from './PixiCreate';
import Collisions from './Collisions';

export class Hero {
  constructor() {
    this.gravity = 0.05;
    this.jumpVelocity = -0.5;
    // this.jumpMaxVelocity = 200;
    this.jumpMaxTimer = 0;
    this.jumpMaxTime = 500;
    this.velocity = { y: 0, x: 0.5 };
    this.floorAcceleration = 0.0001;
    this.maxVelocity = 1;
    this.temporaryTicker = 0;
    this.onFloor = false;
    this._dead = false;
    this.collisions = new Collisions();
    this.isJumping = false;

    this.texture = new Pixi.engine.Texture.fromImage('./assets/hero.png').baseTexture;

    // this.ergh = new Pixi.engine.Texture(this.texture, {
    //   x: 0,
    //   y: 0,
    //   width: this.spriteSize,
    //   height: this.spriteSize
    // });
    // this.sprite = new Pixi.engine.Sprite(this.ergh);
    //
    this.spriteSize = 50;

    this.spriteTextures = {};
    // this.sprites = {};
    ['run', 'jump', 'dead'].forEach((pose, i) => {
      this.spriteTextures[pose] = new Pixi.engine.Texture(this.texture, {
        x: i * this.spriteSize,
        y: 0,
        width: this.spriteSize,
        height: this.spriteSize
      });
      // this.sprites[pose] = new Pixi.engine.Sprite(this.spriteTextures[pose]);
    });

    // Default, for a split second
    this.sprite = new Pixi.engine.Sprite(this.spriteTextures['jump']);

    // Pixi.engine.utils.TextureCache[0] = sprite;

    // this.sprite = this.sprite1; // new Pixi.engine.Sprite.fromImage('./assets/hero.png');

    // this.width = this.sprite.width = 50;
    // this.height = this.sprite.height = 50;
    // this.sprite.anchor.x = 0;
    // this.sprite.anchor.y = 0;
    // this.sprite.scale = { x: 1, y: 1 };
    // this.sprite.position = {
    //   x: 300,
    //   y: 300
    // };

    Pixi.app.stage.addChild(this.sprite);

    this.x = Pixi.width * 0.1;
    this.y = 0;

    // Interaction
    document.addEventListener('keydown', e => {
      e.preventDefault(); // brutal but, stop paging
      if (this.onFloor && !this.dead) {
        this.isJumping = true;
        this.jump();
        let keydown = e;
        document.addEventListener('keyup', e => {
          if (e.keyCode == keydown.keyCode) {
            this.isJumping = false;
          }
        });
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

  // set position(position) {
  //   this._position = position;
  //   this.sprite.position = position;
  // }
  // get position() {
  //   return this._position;
  // }

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

  jump() {
    // if (this.dead || !this.onFloor) return;
    // this.velocity.y = -this.jumpVelocity;
  }
  jumping(dt) {
    if (this.isJumping) {
      this.jumpMaxTimer += dt;

      // Don't use dt here, with velocity.. just in forces when it shifts the actual .y
      if (this.jumpMaxTimer > this.jumpMaxTime) {
        this.jumpMaxTimer = 0;
        this.isJumping = false;
        return;
      }
      //
      // if (this.velocity.y < -this.jumpMaxVelocity) {
      //   return;
      // }
      // // this.velocity.y -= this.jumpVelocity;
      // this.velocity.y = this.jumpVelocity;

      this.velocity.y = this.jumpVelocity;
      // console.log(this.velocity.y);
    }
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
      // if (i > 0) return; // FORCE ONLY LEFTMOST BUILDING COLLISIONS

      if (this.collisions.isUnderfoot(this, building)) {
        this.onFloor = true;
        // this.isJumping = false;
        // if (this.dead) return;
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
          // console.log('in air');
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
    // Isn't necessary much, as the engine handles all rendering updates

    // this.velocity.x = Math.sin(++this.temporaryTicker / 100) + 1;
    this.pose();
    this.jumping(dt);
    this.forces(dt);
    this.acceleration(dt);
  }
}
