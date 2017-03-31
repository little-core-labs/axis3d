'use strict'

/**
 * Module exports.
 */

import * as core from './core'
import * as mesh from './mesh'
import * as math from './math'
import * as input from './input'
import * as light from './light'
import * as cameras from './cameras'
import * as material from './material'
import * as geometry from './geometry'

/**
 * Library API
 * @ignore
 */

void [
  core,
  mesh,
  math,
  input,
  light,
  cameras,
  material,
  geometry,
].forEach(makeAPI)

/**
 * Converts classes into functional units, otherwise module exports
 * are just proxied.
 * @private
 */

function makeAPI(mod) {
  // Make every class callable as a function
  for (const key in mod) {
    if ('function' == typeof mod[key]) {
      Object.defineProperty(exports, key, {
        get: () => (...args) => new mod[key](...args)
      })
    } else {
      Object.defineProperty(exports, key, {get: () => mod[key]})
    }
  }
}
