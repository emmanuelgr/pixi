import * as PIXI from 'pixi.js'
import { app } from '../../index'
import { LifeCycle } from '../../LifeCycle'
import { easeInOutCubic } from '../../Utils'

export class Sparks extends PIXI.ParticleContainer implements LifeCycle {
  private elements: PIXI.Sprite[] = []

  constructor() {
    super(10, {
      vertices: true,
      position: true,
      rotation: true,
      uvs: true,
      tint: true,
    })
  }

  init() {
    for (let i = 0; i < 3; i++) {
      const sprite = new PIXI.Sprite()
      sprite.texture = app.loader.resources['4'].texture
      sprite.texture.frame = new PIXI.Rectangle(0, 256, 256, 256)

      sprite.anchor.set(0.5)
      sprite.tint = 0xffcc99 + Math.random() * 100
      sprite.blendMode = PIXI.BLEND_MODES.OVERLAY

      this.elements.push(sprite)
      this.addChild(sprite)
    }

    this.blendMode = PIXI.BLEND_MODES.ADD
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return

    this.x = app.screen.width * 0.5
    this.y = app.screen.height * 0.5

    for (let i = 0; i < this.elements.length; i++) {
      const part = this.elements[i]
      const timeOffset1 = lastTime + i * 2000
      const w1 = (timeOffset1 % 5000) / 5000
      const zOz = 1 - Math.abs(w1 * 2 - 1)
      part.x = Math.sin(w1 * 10) * (30 + Math.random() * 3)
      part.y = -easeInOutCubic(0, 60, w1)
      part.alpha = zOz * (0.4 + Math.random() * 0.3)
      part.scale.x = part.scale.y = easeInOutCubic(0.0, 0.05, w1)
    }
  }
}
