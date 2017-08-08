import vec3 from 'gl-vec3'

const kEpsilon = 0.000000001

// adapted from:
// https://github.com/Jam3/perspective-camera/blob/master/lib/camera-look-at.js
export function lookAt(direction, target, position, up) {
  const tmp = []
  vec3.subtract(tmp, target, position)
  vec3.normalize(tmp, tmp)
  if (tmp.every(Boolean)) { // not zero vector
    const d = vec3.dot(tmp, up)
    if (Math.abs(d - 1) < kEpsilon) { // collinear
      vec3.scale(up, direction, -1)
    } else if (Math.abs(d + 1) < kEpsilon) { // collinear opposite
      vec3.copy(up, direction)
    }
    vec3.copy(direction, tmp)
    vec3.cross(tmp, direction, up)
    vec3.normalize(tmp, tmp)
    vec3.cross(up, tmp, direction)
    vec3.normalize(up, up)
  }
}
