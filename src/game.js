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
    this.gameState = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.gameObjects = [];
  }
  start() {
    if(this.gameState !== GAME_STATE.MENU) return;
    this.bricks = buildLevel(this, level1);
    this.gameObjects = [this.paddle, this.ball, ...this.bricks];
    this.gameState = GAME_STATE.RUNNING;
  }
  update(ctx) {
    if ((this.gameState == GAME_STATE.PAUSED) || (this.gameState == GAME_STATE.MENU)) return;
    this.gameObjects.forEach((obj) => {
      obj.update(ctx);
    });
    this.gameObjects = this.gameObjects.filter((obj) => !obj.markForDeletion);
  }
  draw(ctx) {
    this.gameObjects.forEach((obj) => {
      obj.draw(ctx);
    });
    if(this.gameState == GAME_STATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0, 0, 5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = 'center';
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gameState == GAME_STATE.MENU){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0, 0, 5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = 'center';
      ctx.fillText("Press Space to Start", this.gameWidth/2, this.gameHeight/2);
    }
  }
  togglePause() {

    if (this.gameState == GAME_STATE.PAUSED) {
      console.log('Pause func')
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
