import * as PIXI from 'pixi.js'
import { app } from '../../index'
import { LifeCycle } from '../../LifeCycle'
import { Fps } from '../../elems/Fps'
import { Cards } from './Cards'
import { ButtonX } from '../../elems/ButtonX'

export class Stack extends PIXI.Container implements LifeCycle {
  private elements = [new Cards(), new Fps(), new ButtonX()]

  constructor() {
    super()
  }

  init() {
    // add elements to container
    for (let i = 0; i < this.elements.length; i++) {
      const elem = this.elements[i]
      elem.init()
      this.addChild(elem)
    }
  }

  start(): void {
    // show itself
    app.stage.addChild(this)

    // propegate start
    // for (let i = 0; i < this.elements.length; i++) {
    //   const elem = this.elements[i]
    //   if (elem.start) elem.start()
    // }
  }

  stop(): void {
    // remove from stage
    app.stage.removeChild(this)

    // propegate stop
    // for (let i = 0; i < this.elements.length; i++) {
    //   const elem = this.elements[i]
    //   if (elem.stop) elem.stop()
    // }
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return

    // propegate update
    for (let i = 0; i < this.elements.length; i++) {
      const elem = this.elements[i]
      elem.update(deltaMS, lastTime)
    }
  }
}
