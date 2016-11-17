'use strict'

/**
 * Module dependencies.
 */

import { version } from './package'
import createDebug from 'debug'

/**
 * Math dependencies.
 */

const { round, floor, pow, } = Math

/**
 * Define property helper.
 *
 * @public
 * @param {Object} a
 * @param {String} b
 * @param {Object} c
 */

export const define = (a, b, c) => Object.defineProperty(a, b, { ...c })

/**
 * Converts input degrees to radians
 *
 * @public
 * @param {Number} n
 * @return {Number}
 */

export const radians = (n) => n == n ? (n*Math.PI/180.0) : 0

/**
 * Utility debug output
 *
 * @public
 * @param {String} fmt
 * @param {...Mixed} args
 */

export const debug = createDebug(`[axis@${version}]`)

/**
 * Simple linear inerpolation function.
 *
 * @public
 * @param {Number} v0
 * @param {Number} v1
 * @param {Number} t
 * @return {Number}
 */

export const lerp = (v0, v1, t) => v0*(1 - t) + v1*t

/**
 * Predicate function to determine if a given DOM
 * element is in the window's viewport.
 *
 * @public
 * @param {Element} domElement
 * @return {Boolean}
 */

export const isDOMElementInViewport = (domElement) => {
  const {clientWidth, clientHeight} = document.documentElement
  const {top, left, bottom, right} = domElement.getBoundingClientRect()
  const {innerWidth, innerHeight} = window
  const height = innerHeight || clientHeight
  const width = innerWidth || clientWidth
  return bottom > 0 && right > 0 && left < width && top < height
}

/**
 * Returns the screen orientation angle.
 * Borrowed from https://github.com/hawksley/eleVR-Web-Player/blob/master/lib/util.js
 *
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
 */

export const nearestPowerOfTwo = (value) => pow(2, round(Math.log(value) / Math.LN2))

/**
 * Convert an image or canvas to the nearest power
 * of two.
 * Borrowed from https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLTextures.js
 *
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const makePowerOfTwo = (image) => {
	if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement) {
		const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
		const context = canvas.getContext('2d')

		canvas.width = nearestPowerOfTwo(image.width)
		canvas.height = nearestPowerOfTwo(image.height)
		context.drawImage(image, 0, 0, canvas.width, canvas.height)

		return canvas
	}

	return image
}

/**
 */

export const createCanvas = () => document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')

/**
 * Scale image using a canvas.
 * Warning: Scaling through the canvas will only work with
 * images that use premultiplied alpha.
 *
 * Borrowed from https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLTextures.js
 *
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @param {Number} maxSize
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const scaleWithCanvas = (image, scale) => {
  const canvas = createCanvas()
  const context = canvas.getContext( '2d' )

  canvas.width = Math.floor(image.width * scale)
  canvas.height = Math.floor(image.height * scale)

  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)
  return canvas
}

/**
 * Clamp an image to a max size.
 *
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @param {Number} maxSize
 * @return {HTMLImageElement|HTMLCanvasElement}
 */

export const clampToMaxSize = (image, maxSize) => {
	if (image.width > maxSize || image.height > maxSize) {
    return scaleWithCanvas(image, maxSize/Math.max(image.width, image.height))
  } else {
    return image
  }
}
