import React, { Component } from "react";
import Pixi from "./PixiCreate";
import { Hero } from "./Hero";
import { Sprite } from "./Sprite";
import { Background } from "./Background";
import { BuildingCollection } from "./BuildingCollection";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.then = Date.now();

    // Z-index style ordering here is significant but not absolute, e.g. new buildings will be highest
    this.background = new Background();
    this.hero = new Hero();
    this.Sprite = new Sprite({
      test: true,
      spriteSheet: "./assets/hero.png",
      poses: [
        {
          name: "run",
          interval: 100,
          frames: [
            {
              x: 0,
              y: 0,
              width: 100,
              height: 100
            },
            {
              x: 100,
              y: 0,
              width: 100,
              height: 100
            }
          ]
        },
        {
          name: "jump",
          interval: 500,
          frames: [
            {
              x: 150,
              y: 0,
              width: 100,
              height: 100
            },
            {
              x: 200,
              y: 0,
              width: 100,
              height: 100
            }
          ]
        }
      ]
    });

    this.buildingCollection = new BuildingCollection({
      hero: this.hero
    });

    this.hudScore = new Pixi.engine.Text("Score: ", {
      fontFamily: "Arial",
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
