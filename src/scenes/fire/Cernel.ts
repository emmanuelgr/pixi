import * as PIXI from 'pixi.js'
import { app } from '../../index'
import { LifeCycle } from '../../LifeCycle'
import { easeInOutCubic } from '../../Utils'

export class Cernel extends PIXI.ParticleContainer implements LifeCycle {
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
    for (let i = 0; i < 4; i++) {
      const sprite = new PIXI.Sprite()
      sprite.texture = app.loader.resources['4'].texture
      sprite.texture.frame = new PIXI.Rectangle(0, 256, 256, 256)

      sprite.anchor.set(0.5)
      sprite.tint = 0xdd8811
      sprite.blendMode = PIXI.BLEND_MODES.OVERLAY

      this.elements.push(sprite)
      this.addChild(sprite)
    }

    this.blendMode = PIXI.BLEND_MODES.ADD
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return

    this.x = app.screen.width * 0.5
    this.y = app.screen.height * 0.6

    for (let i = 0; i < this.elements.length; i++) {
      const part = this.elements[i]
      const timeOffset1 = lastTime + i * 600
      const timeOffset2 = lastTime + i * 30
      const w1 = (timeOffset1 % 5000) / 5000
      const w2 = (timeOffset1 % 1000) / 1000
      const w3 = (timeOffset1 % 100) / 100
      const zOz = 1 - Math.abs(w2 * 2 - 1)
      part.x = Math.sin(zOz) * (5 + Math.random() * 3)
      part.y = -easeInOutCubic(0, 20, w2)
      part.alpha = easeInOutCubic(0, 1, zOz)
      part.rotation += w2 * 0.02
      part.scale.x = part.scale.y = easeInOutCubic(0.2, 0.3, w1)
    }
  }
}
