import Pixi from "./PixiCreate";
import Sprite from "./Sprite";
import Poses from "./HeroPoses";

export class HeroSpriteTest {
  constructor() {
    this.sprite = new Sprite({
      test: true,
      spriteSheet: "./assets/hero.png",
      poses: Poses
    });
    this.sprite.position = {
      x: Pixi.width / 2,
      y: Pixi.height / 2
    };

    this.x = Pixi.width / 2;
    this.y = Pixi.height / 2;

    // setTimeout(() => {
    //   this.sprite.pose("run");
    // }, 1000);

    console.log(Poses);

    this.posesTicker = 0;
    setInterval(() => {
      // this.sprite.texture = this.frames["run"];
      console.log(Poses[this.posesTicker].name);

      this.sprite.pose(Poses[this.posesTicker].name);

      this.posesTicker =
        this.posesTicker >= Poses.length - 1 ? 0 : ++this.posesTicker;
    }, 3000);
  }
}
