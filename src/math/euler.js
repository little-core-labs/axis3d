'use strict'

/**
 * Module dependencies.
 */

import { Vector } from './vector'
import coalesce from 'defined'

export class Euler extends Vector {
  constructor(x, y, z, order = 'xyz') {
    super(coalesce(x, 0), coalesce(y, 0), coalesce(z, 0))
    this.order = order
  }
}

/**
 * Borrowed from http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/
 */

export function computeQuaternion(euler, order = 'xyz') {
	const cx = Math.cos(0.5*euler[0])
	const cy = Math.cos(0.5*euler[1])
	const cz = Math.cos(0.5*euler[2])
	const sx = Math.sin(0.5*euler[0])
	const sy = Math.sin(0.5*euler[1])
	const sz = Math.sin(0.5*euler[2])

  let x = 0
	let y = 0
  let z = 0
  let w = 1

	if (order == 'xyz') {
		x = sx * cy * cz + cx * sy * sz
		y = cx * sy * cz - sx * cy * sz
		z = cx * cy * sz + sx * sy * cz
		w = cx * cy * cz - sx * sy * sz
	} else if (order == 'yxz') {
		x = sx * cy * cz + cx * sy * sz
		y = cx * sy * cz - sx * cy * sz
		z = cx * cy * sz - sx * sy * cz
		w = cx * cy * cz + sx * sy * sz
	} else if (order == 'zxy') {
		x = sx * cy * cz - cx * sy * sz
		y = cx * sy * cz + sx * cy * sz
		z = cx * cy * sz + sx * sy * cz
		w = cx * cy * cz - sx * sy * sz
	} else if (order == 'zyx') {
		x = sx * cy * cz - cx * sy * sz
		y = cx * sy * cz + sx * cy * sz
		z = cx * cy * sz - sx * sy * cz
		w = cx * cy * cz + sx * sy * sz
	} else if (order == 'yzx') {
		x = sx * cy * cz + cx * sy * sz
		y = cx * sy * cz + sx * cy * sz
		z = cx * cy * sz - sx * sy * cz
		w = cx * cy * cz - sx * sy * sz
	} else if (order == 'xzy') {
		x = sx * cy * cz - cx * sy * sz
		y = cx * sy * cz - sx * cy * sz
		z = cx * cy * sz + sx * sy * cz
		w = cx * cy * cz + sx * sy * sz
	}

	return [x, y, z, w]
}
