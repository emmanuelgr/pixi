import * as PIXI from 'pixi.js'
import { app } from '../../index'
import { LifeCycle } from '../../LifeCycle'
import { ButtonX } from '../../elems/ButtonX'
import { Smoke } from './Smoke'
import { Cernel } from './Cernel'
import { Sparks } from './Sparks'

export class Fire extends PIXI.Container implements LifeCycle {
  private elements = [new Smoke(), new Cernel(), new Sparks(), new ButtonX()]

  constructor() {
    super()
  }

  init() {
    for (let i = 0; i < this.elements.length; i++) {
      const elem = this.elements[i]
      elem.init()
      this.addChild(elem)
    }
  }

  start(): void {
    // show itself
    app.stage.addChild(this)
  }

  stop(): void {
    // remove from stage
    app.stage.removeChild(this)
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return

    for (let i = 0; i < this.elements.length; i++) {
      const elem = this.elements[i]
      elem.update(deltaMS, lastTime)
    }
  }
}
