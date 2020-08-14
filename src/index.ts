import * as PIXI from 'pixi.js'
import './style.css'
import { Stack } from './scenes/stack/Stack'
import { Fire } from './scenes/fire/Fire'
import { Menu } from './scenes/menu/Menu'
import { Button } from './elems/Button'

export type Scene = 'menu' | 'stack' | 'fire' | 'tool'

export let app: PIXI.Application

// All the valid scenes
const scenes: Record<Scene, Stack | Fire | Menu> = {
  stack: new Stack(),
  fire: new Fire(),
  tool: new Fire(),
  menu: new Menu(),
}
// the active scene
let activeScene: Stack | Fire | Menu
//
export function setScene(scene: Scene) {
  if (activeScene) activeScene.stop()
  activeScene = scenes[scene]
  activeScene.start()
}

const init = () => {
  // create app
  app = new PIXI.Application({
    antialias: true,
    resizeTo: window,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0x222222,
  })

  // stop ticking when tab not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      app.stop()
    } else {
      app.start()
    }
  })

  // TODO: show user loading status
  // load the textures we need
  app.loader
    .add('meli', './assets/meli.png')
    .add('15', './assets/Smoke15Frames.png')
    .add('4', './assets/hiclipart.com.png')
    .add('desyrel', './assets/bitmap-font/desyrel.xml')
    .load(setup)
}

const setup = () => {
  // Add canvas
  document.body.appendChild(app.view)

  // init
  scenes.stack.init()
  scenes.fire.init()
  scenes.tool.init()
  scenes.menu.init()
  setScene('fire')

  app.ticker.add(update)

  function update() {
    activeScene.update(app.ticker.deltaMS, app.ticker.lastTime)
    app.renderer.render(app.stage)
  }
}

window.addEventListener('load', () => {
  init()
})
