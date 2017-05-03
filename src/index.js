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
      const func = (...args) => new mod[key](...args)
      //for (const prop of Object.getOwnPropertyNames(mod[key])) {
        //if (null == func[prop]) {
          //func[prop] = mod[key][prop]
        //}
      //}
      Object.defineProperty(exports, key, {
        get: () => func
      })
    } else {
      Object.defineProperty(exports, key, {get: () => mod[key]})
    }
  }
}
