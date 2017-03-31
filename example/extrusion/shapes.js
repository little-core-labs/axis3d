'use strict'

/**
 * Module dependencies.
 */

import { TriangleGeometry } from 'axis3d'

// thank you freeman-lab for providing these shapes
// https://github.com/freeman-lab/extrude/blob/master/shapes

export class Polygon {
  constructor(sides) {
    this.positions = []
    for (let i = 0; i < sides; ++i) {
      this.positions.push([
        Math.cos(2*i*Math.PI/sides),
        Math.sin(2*i*Math.PI/sides)
      ])
    }
  }
}

// we can just use the built in 2d triangle
export const triangle = TriangleGeometry()

export const square = new class Square {
  constructor() {
    const p = 0.5
    this.positions = [
      [+p, +p],
      [-p, +p],
      [-p, -p],
      [+p, -p],
    ]
  }
}

export const circle = new class Circle {
  constructor() {
    const positions = []
    for (let i = 0; i < 2*Math.PI; i += 2*Math.PI/30) {
      positions.push([Math.sin(i), Math.cos(i)])
    }

    this.positions = positions.reverse()
  }
}

export const hexagon = new class Hexagon extends Polygon {
  constructor() {
    super(6)
  }
}

export const heart = new class Heart {
  constructor() {
    const positions = []
    for (let i = 0; i < 2*Math.PI; i += 2*Math.PI/50) {
      positions.push([
        (1/13)*(16*Math.pow(Math.sin(i), 3)),
        (1/13)*(13*Math.cos(i)-5*Math.cos(2*i)-2*Math.cos(3*i)-Math.cos(4*i))
      ])
    }

    this.positions = positions.reverse()
  }
}

export const helix = new class Helix {
  constructor() {
    const path = []
    const positions = [
      [0,0], [-0.06,-0.08], [0.06,-0.08], [0,-0.2], [0.06,-0.08],
      [0.1,0.03], [0.19,-0.06], [0.1,0.03], [0,0.1], [0.12,0.16], [0,0.1],
      [-0.1,0.03], [-0.12,0.16], [-0.1,0.03], [-0.06,-0.08], [-0.19,-0.06]
    ]

    for (let i = 0; i < 1000; ++i) {
      const theta = i/320*2*Math.PI
      const p = (i-500)/250
      path.push([Math.cos(theta), Math.sin(theta), p, 8*theta])
    }

    this.path = path
    this.positions = positions
  }
}
