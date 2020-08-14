/* eslint-disable @typescript-eslint/no-empty-function */
import * as PIXI from 'pixi.js'
import { LifeCycle } from '../LifeCycle'
import { app } from '../index'

export class Fps extends PIXI.Container implements LifeCycle {
  private fpsV: PIXI.BitmapText
  private fps: PIXI.BitmapText

  constructor() {
    super()
  }

  init() {
    this.fpsV = new PIXI.BitmapText('', {
      fontName: 'Desyrel',
      fontSize: 30,
      align: 'right',
      letterSpacing: 10,
    })
    this.fps = new PIXI.BitmapText('fps', {
      fontName: 'Desyrel',
      fontSize: 30,
      align: 'right',
      letterSpacing: 10,
    })
    // padd
    this.x = this.y = 10
    this.fps.x = 50
    // add to container
    this.addChild(this.fpsV)
    this.addChild(this.fps)
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return
    this.fpsV.text = `${Math.round(app.ticker.FPS)}`
  }
}
