'use strict'
import { Context, Entity } from '../../src'
import { lerp } from 'gl-vec3'
import html from 'yo-yo'

import {
  Object3DTRSContext,
  Object3DMatrixContext,
  Object3D,
  Frame,
  ScopedContext,
  Shader,
} from '../../src'

const ctx = new Context()

ctx.on('error', (err) => console.log(err.stack || err))

const frame = Frame(ctx)

/**
 * Default color for the `colorfulElement` entity.
 */
const defaultColor = [0.1*255, 0.2*255, 0.3*255]

/**
 * DOM element template constructor.
 * template(color: Array<Number>) -> DOMElement
 */
const template = (color = [0, 0, 0]) => html`
  <div style="
  display: block;
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom : 0;
  background-color: rgb(${color});
  "></div>
`

/**
 * Applies color from arguments to component DOM element.
 * ColorfulDOMElementPureComponent({domElement, color}, next) -> void
 */
function ColorfulDOMElementPureComponent({domElement, color}, next) {
  const currentColor = parseRgb(domElement.style.color)
  if (currentColor) { lerp(color, currentColor, color, 0.000001) }
  requestAnimationFrame(() => html.update(domElement, template(color)))
  return next()
}

/**
 * parseRgb(str: String) -> Array<Number>|null
 */
function parseRgb(str) {
  const match = String(str).match(/rgb\((.*)\)/)
  const color = match && String(match[1]).split(',').map((c) => parseFloat(c))
  return color
}

/**
 * colorfulElement({color: Array<Number>}, scope) -> void
 */
const colorfulElement = Entity(ctx, {
  domElement: document.body.appendChild(template(defaultColor)),
  color: defaultColor,
},
  ColorfulDOMElementPureComponent,
  Object3D(ctx),
  )

const other = Entity(ctx,
  {position: [2, 2, 2]},
  Object3D(ctx),
  Shader(ctx, {
    vertexShader: `
    void main() {
      gl_Position = vec4(0.1, 0.1, 0.1, 1.0);
    }
    `,

    fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.1, 0.2, 0.3, 1.0);
    }
    `
  })
)

frame(({time, clear}) => {
  const color = [
    parseInt(100 + (100*Math.cos(time) % 255)),
    parseInt(100 + (100*Math.sin(time) % 255)),
    parseInt(100 + (100*Math.cos(time) % 255)),
  ]
  colorfulElement({ position: [0, 2, 3], color })
})

