import React, { Component } from "react";
import Pixi from "./PixiCreate";
import { Hero } from "./Hero";
import { HeroSpriteTest } from "./HeroSpriteTest";
import { Background } from "./Background";
import { BuildingCollection } from "./BuildingCollection";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.then = Date.now();
    this.paused = false;

    // Z-index style ordering here is significant but not absolute, e.g. new buildings will be highest
    this.background = new Background();
    this.hero = new Hero();
    this.HeroSpriteTest = new HeroSpriteTest();

    this.buildingCollection = new BuildingCollection({
      hero: this.hero
    });

    (this.hudScore = new Pixi.engine.Text("Score: ", {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0xff6a00,
      align: "left"
    })).position = { x: 5, y: 5 }; // syntax just to be annoying xD

    (this.hudPause = new Pixi.engine.Text("Esc to pause", {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x444444,
      align: "left"
    })).position = { x: 5, y: Pixi.height - 25 };

    // These don't have to be spread in, but I kinda feel like they'll all want arrayifying eventually
    Pixi.app.stage.addChild(...[this.hudScore, this.hudPause]);

    // Could like, embiggen the score as it's going up and anything stuff like that
    // Pixi.app.ticker.add(dt => {
    //   this.hudScore.rotation += 0.01;
    // });

    // Pause - esc
    document.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        this.paused = !this.paused;
      }
    });
  }

  componentDidMount() {
    document.getElementById("game").appendChild(Pixi.app.view);

    this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    let dt = Date.now() - this.then;
    if (this.paused) dt = 0;
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
