'use strict'

import createDebug from 'debug'
import document from 'global/document'
import window from 'global/window'
import clamp from 'clamp'

const { round, floor, pow } = Math

const kLibraryVersion = __AXIS3D_VERSION__
const TypedArray = Object.getPrototypeOf(Float32Array.prototype).constructor

export const nearestPowerOfTwo = (value) => pow(2, round(Math.log(value) / Math.LN2))
export const radians = (n) => n == n ? (n*Math.PI/180.0) : 0
export const debug = createDebug(`[axis@${kLibraryVersion}]`)
export const lerp = (v0, v1, t) => v0*(1 - t) + v1*t
export const get = (k, objs) => (objs.filter((o) => o).find((o) => o[k]) || {})[k]

export const getScreenOrientation = () => {
  switch (window.screen.orientation || window.screen.mozOrientation) {
    case 'landscape-primary': return 90
    case 'landscape-secondary': return -90
    case 'portrait-secondary': return 180
    case 'portrait-primary': return 0
  }
  return window.orientation || 0
}

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

export const createCanvas = () =>
  document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')

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

export const clampToMaxSize = (image, maxSize, scaleNearestPowerOfTwo = false) => {
	if (image.width > maxSize || image.height > maxSize) {
    const scale = maxSize/Math.max(image.width, image.height)
    return scaleWithCanvas(image, scale, scaleNearestPowerOfTwo)
  } else {
    return scaleNearestPowerOfTwo ? makePowerOfTwo(image) : image
  }
}

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

export const isArrayLike = (array) => {
  return Boolean(array && (
    Array.isArray(array)
    || array instanceof TypedArray
    || ('number' == array.length &&
        'function' == typeof array[Symbol.iterator])
  ))
}
