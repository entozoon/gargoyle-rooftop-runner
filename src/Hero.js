import Pixi from "./PixiCreate";
import Collisions from "./Collisions";
import Sprite from "./Sprite";
import Poses from "./HeroPoses";

export class Hero {
  constructor() {
    this.gravity = 0.0021; //0.035;
    this.jumpVelocity = -1.4;
    this.velocity = { y: 0, x: 0.1 };
    this.floorAcceleration = 0.0001;
    // this.velocity = { y: 0, x: 0 }; // halt
    // this.floorAcceleration = 0.0; // halt
    this.maxVelocity = 2;
    this.score = 0;
    this.scoringFactor = 0.01;
    // Hurray for magic arbitrary numbers!
    this.furthestJumpDistance = 1200;
    // this.temporaryTicker = 0;
    this.onFloor = false;
    this._dead = false;
    this.collisions = new Collisions({
      bboxFraction: 0.5
    });
    this._jumping = false;

    this.texture = new Pixi.engine.Texture.fromImage(
      "./assets/hero.png"
    ).baseTexture;

    this.sprite = new Sprite({
      spriteSheet: "./assets/hero.png",
      poses: Poses,
      // hero: this
      velocity: this.velocity
    });

    // Independent of sprite dimensions!
    this.width = 36;
    this.height = 43;

    // this.spriteSize = 100;

    // this.spriteTextures = {};
    // ["run", "jump", "fall", "dead"].forEach((pose, i) => {
    //   this.spriteTextures[pose] = new Pixi.engine.Texture(this.texture, {
    //     x: i * this.spriteSize,
    //     y: 0,
    //     width: this.spriteSize,
    //     height: this.spriteSize
    //   });
    // });

    // // Default, for a split second
    // this.sprite = new Pixi.engine.Sprite(this.spriteTextures["jump"]);

    // Pixi.app.stage.addChild(this.sprite);

    this.x = Pixi.width * 0.1;
    this.y = 0;

    document.addEventListener("keydown", e => {
      // Space
      if (e.keyCode === 32) {
        e.preventDefault(); // brutal but, stop paging
        if (!this.jumpingPressed) {
          this.jumpingPressed = true;
        }
      }
    });
    document.addEventListener("touchstart", () => {
      if (!this.jumpingPressed) {
        this.jumpingPressed = true;
      }
    });
    document.addEventListener("keyup", e => {
      if (e.keyCode === 32) {
        this.jumpingPressed = false;
      }
    });
    document.addEventListener("touchend", () => {
      this.jumpingPressed = false;
    });
  }

  // I should really be currying this junk
  set position(value) {
    this.sprite.position = value;
  }
  get position() {
    return this.sprite.position;
  }
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
  getVelocity() {
    return this._velocity;
  }

  get dead() {
    return this._dead;
  }
  set dead(dead) {
    this._dead = dead;
    if (dead) {
      this.velocity.y = 0;
      this.velocity.x = 0;
      console.log("Game over");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
  }

  pose() {
    if (this.dead) {
      this.sprite.pose = "dead";
    } else if (this.velocity.y < 0) {
      this.sprite.pose = "jump";
    } else if (this.onFloor) {
      if (this.velocity.x < 1) {
        this.sprite.adrenaline = this.velocity.x * 150;
        this.sprite.pose = "walk";
      } else {
        this.sprite.adrenaline = this.velocity.x * 150;
        this.sprite.pose = "fly";
      }
    } else {
      this.sprite.pose = "fall";
    }
    // this.sprite.texture = this.spriteTextures[this._pose];
  }

  get jumping() {
    return this._jumping;
  }

  set jumping(jumping) {
    if (jumping) {
      // if (this.velocity.y > 0) {
      //   console.log("stop jump");

      //   this._jumping = false;
      // }

      if (this.dead || !this.onFloor) {
        return;
      }

      this.velocity.y = this.jumpVelocity;
    } else if (this.velocity.y < 0) {
      // Halt jump
      // this.velocity.y = 0;
      // Slow jump right down instead
      // this.velocity.y *= 0.5;
      //console.log(this.velocity.y / this.jumpVelocity); // 1 -> 0 (lowest to highest vertically)
      // When purposefully stopping jumping, scale it so that if you're near the ground you move straight back down
      // but if high up in the jump, you move down less quickly..
      // allowing little bunny hops. effect lessened though by magic multiplier so you feel purposeful falls from height
      this.velocity.y *= (1 - this.velocity.y / this.jumpVelocity) * 0.25;
    }
    this._jumping = jumping;
  }

  // stopJump() {
  //   this.velocity.y = 0;
  // }

  maybeJump() {
    if (this.jumpingPressed) {
      if (this.onFloor) {
        this.jumping = true;
      }
    } else {
      this.jumping = false;
    }
  }

  forces(dt) {
    // Hitting floor while moving downward = stop
    if (this.onFloor && this.velocity.y > 0) {
      this.velocity.y = 0;
      return;
    }

    // Falsify jumping var during fall to allow for insta-rejump
    if (this.velocity.y > 0) {
      this.jumping = false;
    }

    this.velocity.y += this.gravity * dt; // * dt!?!? // maybe cap velocity (both dir) to prevent throttling problem too
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

  scoring(dt) {
    // if (this.onFloor) {
    // this.score += dt * this.scoringFactor;
    this.score += dt * this.velocity.x * this.scoringFactor;
  }

  update(dt) {
    // this.velocity.x = Math.sin(++this.temporaryTicker / 100) + 1;
    this.pose();
    this.maybeJump();
    this.forces(dt);
    this.acceleration(dt);
    this.scoring(dt);
  }
}
