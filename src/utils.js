import { MissingContextError, BadArgumentError } from './errors'
import isTypedArray from 'is-typedarray'
import createDebug from 'debug'
import document from 'global/document'
import window from 'global/window'
import extend from 'extend'
import clamp from 'clamp'

const kLibraryVersion = __AXIS3D_VERSION__
const TypedArray = Object.getPrototypeOf(Float32Array.prototype).constructor

const { HTMLImageElement, HTMLCanvasElement } = window

/**
 * Output debug information.
 * debug(...string) -> void
 */
export const debug = createDebug(`[axis3d@${kLibraryVersion}]`)

/**
 * Isolates a function into an isolated lambda scope.
 * isolate(fn: Function) -> (...args) -> fn(...args)
 */
export const isolate = (fn) => (...args) => fn(...args)

/**
 * Convert degress into radians (units of PI).
 * radians(degrees: Number) -> Number
 */
export const radians = (n) => n == n ? (n*Math.PI/180.0) : 0

/**
 * Linearly interpolate `v0` into `v1` at a factor of `t`.
 * lerp(v0: Number, v1: Number, t: Number) -> Number
 */
export const lerp = (v0, v1, t) => v0*(1 - t) + v1*t

/**
 * Returns array of `size` filled with `value`.
 * fill(size: Number, value: Any) -> Array<Any>
 */
export const fill = (size, value) => Array(size).fill(value)

/**
 * Assigns values in defaults object into input
 * object if not already present.
 * assignDefaults(object: Object, defaults: Object) -> Object
 */
export function assignDefaults(object, defaults) {
  return extend(true, object, extend(true, {}, defaults, object))
}

/**
 * Returns the first value found at key `k` in `i` index of objs`.
 * pick(k: String, objs: Array<Object>) -> Any
 */
export function pick(k, objs) {
  return (objs.filter((o) => o).find((o) => null != o[k]) || {})[k]
}

/**
 * @deprecated
 */
export function get(...args) {
  console.warn("utils.get() is deprecated. Please use utils.pick()");
  return pick(...args)
}

/**
 * Returns the nearest power of two for a a given number.
 * nearestPowerOfTwo(value: Number) -> Number
 */
export function nearestPowerOfTwo(value) {
  return Math.pow(2, Math.round(Math.log(value) / Math.LN2))
}

/**
 * Creates and returns a new "namespaced" canvas DOM element.
 * createCanvas(void) -> HTMLCanvasElement
 */
export function createCanvas(){
  return document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
}

/**
 * Returns the orientation of the device screen in degrees.
 * getScreenOrientation(void) -> Number
 */
export function getScreenOrientation() {
  return parseType(getNormalizedOrientation())
  function parseType(type) {
    switch (type) {
      case 'landscape-primary': return 90
      case 'landscape-secondary': return -90
      case 'portrait-secondary': return 180
      case 'portrait-primary': return 0
      default: return window.orientation || window.mozOrientation || 0
    }
  }

  function getNormalizedOrientation() {
    if ('object' == typeof window.screen) {
      if ('object' == typeof window.screen.orientation) {
        return window.screen.orientation.type
      } else if ('string' == typeof window.screen.orientation) {
        return window.screen.orientation
      } else if ('object' == typeof window.screen.mozOrientation) {
        return window.screen.mozOrientation.type
      } else if ('string' == typeof window.screen.mozOrientation) {
        return window.screen.mozOrientation
      }
    }
    return null
  }
}

/**
 * Converts an input image or canvas to a power of two image.
 * makePowerOfTwo(image: HTMLCanvasElement|HTMLImageElement) -> HTMLImageElement|HTMLCanvasElement
 */
export function makePowerOfTwo(image) {
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
 * Scales an image at a given scale and near power of two scale into a returned
 * canvas DOM element.
 * scaleImageIntoCanvas(image: HTMLImageElement,
 *                      scale: HTMLCanvasElement,
 *                      scaleNearestPowerOfTwo: Number) -> HTMLCanvasElement
 */
export function scaleImageIntoCanvas(image, scale, scaleNearestPowerOfTwo) {
  const canvas = createCanvas()
  const context = canvas.getContext('2d')
  let {width, height} = image
  if (scaleNearestPowerOfTwo) {
    width = nearestPowerOfTwo(width)
    height = nearestPowerOfTwo(height)
  }
  canvas.width = Math.floor(image.width * scale)
  canvas.height = Math.floor(image.height * scale)
  context.drawImage(image, 0,0, width, height, 0,0, canvas.width, canvas.height)
  return canvas
}

/**
 * clampImageToMaxSize(image: HTMLCanvasElement,
 *                     maxSize: Number,
 *                     scaleNearestPowerOfTwo: Number) -> HTMLImageElement
 */
export function clampImageToMaxSize(image, maxSize, scaleNearestPowerOfTwo) {
	if (image.width > maxSize || image.height > maxSize) {
    const scale = maxSize/Math.max(image.width, image.height)
    return scaleImageIntoCanvas(image, scale, scaleNearestPowerOfTwo)
  } else {
    return scaleNearestPowerOfTwo ? makePowerOfTwo(image) : image
  }
}

/**
 * Ensures an array of rgba floats contains exactly 4 numbers. If an alpha
 * channel value is missing, then it is assumed to be '1'.
 * ensureRGBA(color: Array<...Number>) -> Array<Number, Number, Number, Number>>
 */
export function ensureRGBA(color) {
  color = [...(color || [])]
  for (let i = 0; i < 3; ++i) {
    if ('number' != typeof color[i]) { color[i] = 0 }
    else { color[i] = clamp(color[i], 0, 1) }
  }
  if ('number' != typeof color[3]) { color[3] = 1 }
  else { color[3] = clamp(color[3], 0, 1) }
  return [...color].slice(0, 4)
}

/**
 * Ensures an array of rgb floats contains exactly 3 numbers.
 * ensureRGB(color: Array<...Number>) -> Array<Number, Number, Number>>
 */
export function ensureRGB(color) {
  return ensureRGBA(color).slice(0, 3)
}

/**
 * Predicate function to determine if an input array is "array like".
 * isArrayLike(array: Any) -> Boolean
 */
export function isArrayLike(array) {
  return Boolean(array && (
       Array.isArray(array)
    || (array instanceof TypedArray || isTypedArray(array))
    || 'number' == array.length
    || 'function' == typeof array[Symbol.iterator])
  )
}

/**
 * Returns a normalized scale vector with optional defaults applied.
 * normalizeScaleVector(scale: Array|Number,
 *                      [defaultScale: Array|Number]) -> Array
 */
export function normalizeScaleVector(scale, defaultScale = [1, 1, 1]) {
  if ('number' == typeof defaultScale) {
    defaultScale = normalizeScaleVector(defaultScale, [1, 1, 1])
  }
  if ('number' == typeof scale) {
    return fill(3, scale)
  } else if (Array.isArray(scale)) {
    return Object.assign(scale, Object.assign([], defaultScale, scale)).slice(0, 3)
  } else {
    return defaultScale
  }
}

/**
 * Ensures an object is returned if input value is not one.
 * ensureObject(value: Any) -> Object
 */
export function ensureObject(value) {
  if (!value) { return {} }
  if (Array.isArray(value)) { return {} }
  if ('object' != typeof value) { return {} }
  return value
}

/**
 * Ensures an array is returned if input value is not one.
 * ensureArray(value: Any) -> Array
 */
export function ensureArray(value) {
  if (!value) { return [] }
  if (!Array.isArray(value)) { return [] }
  return value
}

/**
 * Extracts, formats, and returns the internal type string
 * for any value.
 * toTypeString(value: Any) -> String
 */
export function toTypeString(value) {
  return Object.prototype.toString.call(value)
    .toLowerCase()
    .replace('[object ', '')
    .replace(']', '')
}

/**
 * Asserts a named components arguments are correct. This function will throw
 * a MissingContextError or BadArgumentError error.
 * assertComponentArguments(ctx: Any, initialState: Any) -> void
 */
export function assertComponentArguments(label, ctx, initialState) {
  if (undefined === ctx) {
    throw new MissingContextError(label)
  } else if (null === ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
    throw new BadArgumentError(0, 'ctx', ctx, 'object')
  } else if (initialState && 'object' != typeof initialState) {
    throw new BadArgumentError(1, 'initialState', initialState, 'object')
  }
}
