'use strict'

/**
 * Module dependencies.
 */

import { version } from './package'
import createDebug from 'debug'
import window from 'global/window'
import clamp from 'clamp'

/** @virtual {HTMLCanvasElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement */
/** @virtual {HTMLImageElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement */

const TypedArray = Object.getPrototypeOf(Float32Array.prototype).constructor

/**
 * Math dependencies.
 *
 * @private
 */

const {
  round,
  floor,
  pow,
} = Math

/**
 * Define property helper.
 *
 * @private
 * @function
 * @param {Object} a
 * @param {String} b
 * @param {Object} c
 */

export const define = (a, b, c) => Object.defineProperty(a, b, { ...c })

/**
 * Converts input degrees to radians
 *
 * @private
 * @function
 * @param {Number} n
 * @return {Number}
 */

export const radians = (n) => n == n ? (n*Math.PI/180.0) : 0

/**
 * Utility debug output
 *
 * @private
 * @function
 * @param {String} fmt
 * @param {...Mixed} args
 */

export const debug = createDebug(`[axis@${version}]`)

/**
 * Simple linear inerpolation function.
 *
 * @private
 * @function
 * @param {Number} v0
 * @param {Number} v1
 * @param {Number} t
 * @return {Number}
 */

export const lerp = (v0, v1, t) => v0*(1 - t) + v1*t

/**
 * Returns the screen orientation angle.
 * Borrowed from https://github.com/hawksley/eleVR-Web-Player/blob/master/lib/util.js
 *
 * @private
 * @function
 * @return {Number}
 */

export const getScreenOrientation = () => {
  switch (window.screen.orientation || window.screen.mozOrientation) {
    case 'landscape-primary': return 90
    case 'landscape-secondary': return -90
    case 'portrait-secondary': return 180
    case 'portrait-primary': return 0
  }

  return window.orientation || 0
}

/**
 * Finds the nearest power of two for a
 * given number value.
 *
 * @private
 * @function
 * @param {Number} value
 * @return {Number}
 */

export const nearestPowerOfTwo = (value) => pow(2, round(Math.log(value) / Math.LN2))

/**
 * Convert an image or canvas to the nearest power
 * of two.
 * Borrowed from https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLTextures.js
 *
 * @private
 * @function
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const makePowerOfTwo = (image) => {
	if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement) {
		const canvas = createCanvas()
		const context = canvas.getContext('2d')
		canvas.width = nearestPowerOfTwo(image.width)
		canvas.height = nearestPowerOfTwo(image.height)
		context.drawImage(image, 0, 0, canvas.width, canvas.height)
		return canvas
	}

	return image
}

/**
 * Creates a canvas DOM element.
 *
 * @private
 * @function
 * @return {HTMLCanvasElement}
 */

export const createCanvas = () =>
  document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')

/**
 * Scale image using a canvas.
 * Warning: Scaling through the canvas will only work with
 * images that use premultiplied alpha.
 *
 * Borrowed from https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLTextures.js
 *
 * @private
 * @function
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @param {Number} scale
 * @param {Boolean} scaleNearestPowerOfTwo
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const scaleWithCanvas = (image, scale, scaleNearestPowerOfTwo = false) => {
  const canvas = createCanvas()
  const context = canvas.getContext('2d')
  let {width, height} = image

  if (scaleNearestPowerOfTwo) {
    width = nearestPowerOfTwo(width)
    height = nearestPowerOfTwo(height)
  }

  canvas.width = Math.floor(image.width * scale)
  canvas.height = Math.floor(image.height * scale)
  context.drawImage(image, 0, 0, width, height,
                    0, 0, canvas.width, canvas.height)
  return canvas
}

/**
 * Clamp an image to a max size.
 *
 * @private
 * @function
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @param {Number} maxSize
 * @param {Boolean} scaleNearestPowerOfTwo
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const clampToMaxSize = (image, maxSize, scaleNearestPowerOfTwo = false) => {
	if (image.width > maxSize || image.height > maxSize) {
    const scale = maxSize/Math.max(image.width, image.height)
    return scaleWithCanvas(image, scale, scaleNearestPowerOfTwo)
  } else {
    return scaleNearestPowerOfTwo ? makePowerOfTwo(image) : image
  }
}

/**
 * Ensures input color has RGBA values in the interval of [0, 1].
 *
 * @private
 * @function
 * @param {Array<Number>} color
 * @return {Array<Number>}
 */

export const ensureRGBA = (color) => {
  color = [...(color || [])]
  for (let i = 0; i < 3; ++i) {
    if ('number' != typeof color[i]) {
      color[i] = 0
    } else {
      color[i] = clamp(color[i], 0, 1)
    }
  }

  if ('number' != typeof color[3]) {
    color[3] = 1
  } else {
    color[3] = clamp(color[3], 0, 1)
  }

  return [...color].slice(0, 4)
}

/**
 * Predicate function to determine if input is "array like".
 *
 * @public
 * @function
 * @param {Mixed} array
 * @return {Boolean}
 */

export const isArrayLike = (array) => {
  return Boolean(array && (
    Array.isArray(array)
    || array instanceof TypedArray
    || ('number' == array.length &&
        'function' == typeof array[Symbol.iterator])
  ))
}
