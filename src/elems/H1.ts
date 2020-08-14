import * as PIXI from 'pixi.js'
import { LifeCycle } from '../LifeCycle'

export class H1 extends PIXI.Text implements LifeCycle {
  constructor(title = 'H1') {
    super(title, { fill: 0xbbbbbb })
    this.x = 10
    this.y = 10
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update(deltaMS: number, lastTime: number): void {}
}
