import getPermutations from 'get-unique-permutations'
import { isArrayLike } from '../utils'
import coalesce from 'defined'
import window from 'global/window'

const permutationsCache = {}

export class Vector {
  constructor(...input) {
    let elements = null
    if (isArrayLike(input[0]) || input[0] instanceof Vector) {
      input = input[0]
    }

    if (input.every((i) => isArrayLike(i))) {
      elements = new Float32Array([
        ...input.reduce((x, y) => x.concat([].slice.call(y)), [])
      ])
    } else {
      elements = new Float32Array([].slice.call(input))
    }

    Object.defineProperty(this, 'elements', { get: () => elements })

    for (let i = 0; i < elements.length; ++i) {
      Object.defineProperty(this, i, {
        enumerable: true,
        get: () => elements[i],
        set: (v) => {
          elements[i] = v
          this.onchange(i, v)
        },
      })
    }

    if ('function' == typeof this.constructor.swizzles) {
      let permutations = []
      if (permutationsCache[this.constructor.name]) {
        permutations = permutationsCache[this.constructor.name]
      } else {
        for (const swizzle of this.constructor.swizzles()) {
          permutations.push(...getPermutations(swizzle))
        }
      }

      // update cache with permutations
      permutationsCache[this.constructor.name] = Object.assign(
        permutationsCache[this.constructor.name] || [],
        permutations)

      for (const permutation of permutations) {
        const identifier = permutation.join('')
        if (this.hasOwnProperty(identifier)) { continue }
        Object.defineProperty(this, identifier, {
          get: () => new this.constructor(...permutation.map((p) => this[p]))
        })
      }
    }
  }

  get length() { return this.elements.length }

  onchange(index, value) {}

  set(...args) {
    if (isArrayLike(args[0]) || args[0] instanceof Vector) {
      return this.set(...args[0])
    }
    for (let i = 0 ; i < args.length; ++i) {
      this[i] = coalesce(args[i], this[i])
    }
    return this
  }

  get(offset) {
    return this.elements[offset || 0] || 0
  }

  toArray() {
    return [...this.elements]
  }

  toJSON() {
    return this.toArray()
  }

  valueOf() {
    return this.elements
  }

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]()
  }
}

// give a Vector some array functionality
Object.setPrototypeOf(Vector.prototype, Array.prototype)
