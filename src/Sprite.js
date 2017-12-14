import Pixi from "./PixiCreate";

export class Sprite {
  constructor(options) {
    this.spriteSheetTexture = new Pixi.engine.Texture.fromImage(
      options.spriteSheet
    ).baseTexture;

    this.poses = options.poses;

    // Create texture for each frame
    this.poses = this.poses.map(pose => {
      pose.frames = pose.frames.map(frame => {
        frame.texture = new Pixi.engine.Texture(this.spriteSheetTexture, frame);
        return frame;
      });
      return pose;
    });

    this.pose(); // init

    Pixi.app.stage.addChild(this.sprite);

    // Test mode
    if (options.test) {
      this.x = Pixi.width / 2;
      this.y = Pixi.height / 2;

      setTimeout(() => {
        // this.sprite.texture = this.frames["run"];
        this.pose("run");
      }, 1000);

      setTimeout(() => {
        // this.sprite.texture = this.frames["run"];
        this.pose("jump");
      }, 3000);
    }
  }

  getPose(pose) {
    return this.poses.filter(_ => _.name === pose)[0];
  }

  pose(pose) {
    // If undefined pose, show first frame
    if (typeof pose === "undefined") {
      this.sprite = new Pixi.engine.Sprite(this.poses[0].frames[0].texture);
      return;
    }

    // First frame
    let thisPose = this.getPose(pose);
    this.sprite.texture = thisPose.frames[0].texture;

    // Set the animation going at the desired interval speed
    this.frameTicker = 0;
    clearInterval(this.spriteInterval);
    this.spriteInterval = setInterval(() => {
      // Set the frame texture
      this.sprite.texture = thisPose.frames[this.frameTicker].texture;

      this.frameTicker =
        this.frameTicker >= thisPose.frames.length - 1 ? 0 : ++this.frameTicker;
    }, thisPose.interval);
  }

  set y(value) {
    this.sprite.position.y = value;
  }
  set x(value) {
    this.sprite.position.x = value;
  }
}
