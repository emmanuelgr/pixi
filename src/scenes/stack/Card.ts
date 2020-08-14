import * as PIXI from 'pixi.js'
import { TOTAL } from './Cards'
import { easeInOutCubic, easeInOutQuad } from '../../Utils'
import { LifeCycle } from '../../LifeCycle'
import { app } from '../..'

const ANIM_LENGTH = 2000
const ANIM_LENGTH_RECI = 1 / ANIM_LENGTH

/**
 * Card class, parent will be stage centered
 */
export class Card extends PIXI.Sprite implements LifeCycle {
  private cardIndexRatio: number
  private animationStartTime: number
  // A value between 0-1 that represents the animation as a fraction for this element
  private animationRatio = 0
  // In and Out locations
  private xStart: number
  private xEnd: number
  private rotStart: number
  private rotEnd: number
  // stack flag
  private isOnFirstStack = true

  /**
   * A value 0 to 1 representing the card instance ratio in the array
   * @param cardIndexRatio
   */
  constructor(cardIndexRatio: number) {
    super()
    this.cardIndexRatio = cardIndexRatio
  }

  init() {
    this.texture = app.loader.resources.meli.texture
    // Set pivot
    this.anchor.x = 0.3
    this.anchor.y = 0.6

    // time when the animation will start on this card( every second 1000ms)
    this.animationStartTime = (1 - this.cardIndexRatio) * TOTAL * 1000

    // set in and out x values, keep object visible. Parent container is cenetered
    const halfScreenWidth = app.screen.width * 0.5
    const halfWidth = this.width * 0.5
    this.xStart = this.x = -halfScreenWidth + halfWidth
    this.xEnd = halfScreenWidth - halfWidth

    // set rotation offset
    this.rotStart = this.rotation = -this.cardIndexRatio * Math.PI * 8
    this.rotEnd = this.rotStart + Math.PI * 1.5
    //
    this.cacheAsBitmap = true
  }

  update(deltaMS: number, lastTime: number): void {
    if (!this.parent) return

    // update animation ratio and constrain range to 0-1
    this.animationRatio = Math.max(
      0,
      Math.min((lastTime - this.animationStartTime) * ANIM_LENGTH_RECI, 1),
    )

    // FIXME:  optimization needs to accomodate for stale time
    // if (this.animationRatio > 0 && this.animationRatio < 1) {

    // Update transformations
    this.x = easeInOutCubic(this.xStart, this.xEnd, this.animationRatio)
    this.rotation = easeInOutQuad(
      this.rotStart,
      this.rotEnd,
      this.animationRatio,
    )
    const scl = Math.abs(this.animationRatio * 2 - 1)
    this.scale.x = this.scale.y = easeInOutQuad(1.3, 1, scl)
    // change stacking order
    if (this.isOnFirstStack && this.animationRatio > 0.5) {
      this.isOnFirstStack = false
      this.parent.addChild(this)
    }

    // }
  }
}
