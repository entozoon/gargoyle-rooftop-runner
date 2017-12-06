import React, { Component } from 'react';
import Pixi from './PixiCreate';
import { Hero } from './Hero';
import { BuildingCollection } from './BuildingCollection';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.then = Date.now();

    this.hero = new Hero();
    this.buildingCollection = new BuildingCollection();

    this.text = new Pixi.engine.Text('Score:', {
      fontFamily: 'Verdana',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center'
    });
    this.text.position = { x: 0, y: 0 };

    Pixi.app.stage.addChild(this.text);

    // Could like, embiggen the score as it's going up and anything stuff like that
    // Pixi.app.ticker.add(dt => {
    //   this.text.rotation += 0.01;
    // });
  }

  componentDidMount() {
    document.getElementById('game').appendChild(Pixi.app.view);

    // // this.updatey = window.requestAnimationFrame(this.update());
    // var _this = this;
    // var grah = this.update;
    // var requestId = window.requestAnimFrame(grah());]
    // this.update();

    this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    let dt = Date.now() - this.then;
    this.then = Date.now();

    this.hero.update(dt);
    this.buildingCollection.update(dt, this.hero);

    window.requestAnimationFrame(this.update.bind(this));
  }

  render() {
    return <div id="game" />;
  }
}
