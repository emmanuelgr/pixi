import * as PIXI from 'pixi.js'
import { setScene, app } from '../index'
import { Button } from './Button'

export class ButtonX extends Button {
  constructor() {
    super('x')
  }
  init() {
    super.init()
    this.on('pointerup', () => setScene('menu'))
  }
  update(deltaMS: number, lastTime: number): void {
    super.update(deltaMS, lastTime)
    this.x = app.screen.width - this.width * 0.5 - 10
    this.y = this.height * 0.5 + 10
  }
}
