import React, { Component } from 'react';
import Pixi from './PixiCreate';
import { Hero } from './Hero';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.hero = new Hero();

    this.text = new Pixi.engine.Text('This is a PixiJS text', {
      fontFamily: 'Verdana',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center'
    });

    Pixi.app.stage.addChild(this.text);

    Pixi.app.ticker.add(dt => {
      this.text.rotation += 0.01;
    });
  }

  componentDidMount() {
    document.getElementById('game').appendChild(Pixi.app.view);

    // legit!
    setInterval(() => {
      this.text.rotation += 0.5;
    }, 300);

    // // this.updatey = window.requestAnimationFrame(this.update());
    // var _this = this;
    // var grah = this.update;
    // var requestId = window.requestAnimFrame(grah());]
    // this.update();

    this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    /*
    let then = 0;
    const update = () => {
      let dt = Date.now() - then;
      then = Date.now();
      blocks.forEach(block => {
        block.update(dt);
      });
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
*/
    // window.requestAnimationFrame(this.update());
    window.requestAnimationFrame(this.update.bind(this));
  }

  render() {
    return <div id="game" />;
  }
}
