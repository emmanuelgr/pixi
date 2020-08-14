import * as PIXI from 'pixi.js'
import { app } from '../index'
import { LifeCycle } from '../LifeCycle'
import { TOTAL } from '../scenes/stack/Cards'
import { easeInOutCubic, easeInOutQuad } from '../Utils'

const PADD = 20
/**
 * Button instances are centered
 */
export class Button extends PIXI.Container implements LifeCycle {
  private title: string

  constructor(title = 'Button') {
    super()
    this.title = title
  }

  init() {
    this.buttonMode = true
    this.interactive = true

    const text = new PIXI.Text(this.title, { fill: 0xbbbbbb })
    text.x = PADD
    text.y = PADD * 0.5

    const bg = new PIXI.Graphics()
    bg.lineStyle(2, 0x555555)
    bg.beginFill(0x333333)
    bg.drawRect(0, 0, text.width + PADD * 2, text.height + PADD)
    bg.endFill()

    this.pivot.set(bg.width * 0.5, bg.height * 0.5)

    this.addChild(bg)
    this.addChild(text)

    this.on('pointerout', () => this.scale.set(1))
    this.on('pointerdown', () => this.scale.set(0.94))
    this.on('pointerup', () => this.scale.set(1))
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update(deltaMS: number, lastTime: number): void {}
}
