import React, { Component } from "react";
import Pixi from "./PixiCreate";
import { Hero } from "./Hero";
import { Background } from "./Background";
import { BuildingCollection } from "./BuildingCollection";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.then = Date.now();

    // Z-index style ordering here is significant
    this.background = new Background();
    this.hero = new Hero();

    this.buildingCollection = new BuildingCollection({
      hero: this.hero
    });

    this.jumpTest = new Pixi.engine.Text(
      "Jump height _________ (If you can jump higher than this, then I need to go home and rethink my life)",
      {
        fontFamily: "Tahoma",
        fontSize: 18,
        fill: 0xff6a00,
        align: "left"
      }
    );
    this.jumpTest.position = { x: 60, y: 27 };
    Pixi.app.stage.addChild(this.jumpTest);

    this.hudScore = new Pixi.engine.Text("Score: ", {
      fontFamily: "Tahoma",
      fontSize: 18,
      fill: 0xff6a00,
      align: "left"
    });
    this.hudScore.position = { x: 5, y: 5 };

    Pixi.app.stage.addChild(this.hudScore);

    // Could like, embiggen the score as it's going up and anything stuff like that
    // Pixi.app.ticker.add(dt => {
    //   this.hudScore.rotation += 0.01;
    // });
  }

  componentDidMount() {
    document.getElementById("game").appendChild(Pixi.app.view);

    this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    let dt = Date.now() - this.then;
    this.then = Date.now();

    this.background.update(dt, this.hero.velocity);
    this.hero.update(dt);
    this.hudScore.text = "Score: " + Math.round(this.hero.score);
    this.buildingCollection.update(dt);

    window.requestAnimationFrame(this.update.bind(this));
  }

  render() {
    return <div id="game" />;
  }
}
