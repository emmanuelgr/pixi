import * as PIXI from 'pixi.js'
import { Card } from './Card'
import { app } from '../..'
import { LifeCycle } from '../../LifeCycle'

export const TOTAL = 144

export class Cards extends PIXI.ParticleContainer implements LifeCycle {
  private elements: Card[] = []

  constructor() {
    super(TOTAL, {
      position: true,
      rotation: true,
      vertices: true,
    })
  }

  init() {
    // create all cards
    for (let i = 0; i < TOTAL; i++) {
      const card = new Card(i / (TOTAL - 1))
      this.elements.push(card)
      card.init()
      this.addChild(card)
    }
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return
    // center self
    this.x = app.screen.width * 0.5
    this.y = app.screen.height * 0.5
    // update all cards
    for (let i = 0; i < this.elements.length; i++) {
      const card = this.elements[i]
      card.update(deltaMS, lastTime)
    }
  }
}
