import * as PIXI from 'pixi.js'
import { Card } from './Card'
import { app } from '../..'
import { LifeCycle } from '../../LifeCycle'

export const TOTAL = 144

export class Cards extends PIXI.ParticleContainer implements LifeCycle {
  constructor() {
    super(TOTAL, {
      position: true,
      rotation: true,
      vertices: true,
    })
  }

  init() {
    for (let i = 0; i < TOTAL; i++) {
      const card = new Card(i / (TOTAL - 1))
      card.init()
      this.addChild(card)
    }
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return
    // center self
    this.x = app.screen.width * 0.5
    this.y = app.screen.height * 0.5
    // update children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      ;(child as Card).update(deltaMS, lastTime)
    }
  }
}
