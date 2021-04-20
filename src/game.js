import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";
import Brick from "./brick";
import { buildLevel, level1 } from "./levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  start() {
    this.gameState = GAME_STATE.RUNNING;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.bricks = buildLevel(this, level1);
    this.gameObjects = [this.paddle, this.ball, ...this.bricks];
  }
  update(ctx) {
    if ((this.gameState = GAME_STATE.PAUSED)) return;
    this.gameObjects.forEach((obj) => {
      obj.update(ctx);
    });
    this.gameObjects = this.gameObjects.filter((obj) => !obj.markForDeletion);
  }
  draw(ctx) {
    this.gameObjects.forEach((obj) => {
      obj.draw(ctx);
    });
  }
  togglePause() {
    if (this.gameState == GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
