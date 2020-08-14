import * as PIXI from 'pixi.js'
import './style.css'
import { Cards } from './elems/Cards'
import { LifeCycle } from './type'
import { Fps } from './elems/Fps'

export let app: PIXI.Application
const elems: Array<LifeCycle> = []

const init = () => {
  // create app
  app = new PIXI.Application({
    antialias: true,
    resizeTo: window,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  })
  // load the textures we need
  app.loader
    .add('meli', './assets/meli.png')
    .add('sprites', './assets/sprites.png')
    .add('desyrel', './assets/bitmap-font/desyrel.xml')
    .load(setup)
}

const setup = () => {
  // Add canvas
  document.body.appendChild(app.view)

  // init
  // elems.push(new Card())
  elems.push(new Cards())
  elems.push(new Fps())

  const ticker = new PIXI.Ticker()
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i]
    elem.start(ticker.deltaMS, ticker.lastTime)
  }
  ticker.add(update)
  ticker.start()

  function update() {
    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i]
      elem.update(ticker.deltaMS, ticker.lastTime)
    }
    app.renderer.render(app.stage)
  }
}

window.addEventListener('load', () => {
  init()
})
