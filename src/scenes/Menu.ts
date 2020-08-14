import * as PIXI from 'pixi.js'
import { app, setScene } from '../index'
import { LifeCycle } from '../LifeCycle'
import { Button } from '../elems/Button'

const PADD = 10

export class Menu extends PIXI.Container implements LifeCycle {
  public btnStack = new Button('Stack')
  public btnFire = new Button('Fire')
  public btnTool = new Button('Tool')

  constructor() {
    super()
  }

  init() {
    this.btnStack.init()
    this.btnFire.init()
    this.btnTool.init()
    //positon
    const groupBtns = new PIXI.Container()
    groupBtns.addChild(this.btnStack)
    groupBtns.addChild(this.btnFire)
    groupBtns.addChild(this.btnTool)
    this.btnStack.y = -this.btnStack.height - PADD
    this.btnFire.y = 0
    this.btnTool.y = this.btnStack.height + PADD
    // add elements to container
    this.addChild(groupBtns)

    this.btnStack.on('pointerup', () => setScene('stack'))
    this.btnFire.on('pointerup', () => setScene('fire'))
    this.btnTool.on('pointerup', () => setScene('tool'))
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

    // center self
    this.x = app.screen.width * 0.5
    this.y = app.screen.height * 0.5

    // propegate update
  }
}
