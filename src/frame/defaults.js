export const autoClear = true
export const uniformName = 'frame'
export const blending = {
  equation: 'add',
  enable: false,
  color: [0, 0, 0, 1],
  func: {
    srcRGB: 'src alpha',
    srcAlpha: 1,
    dstRGB: 'one minus src alpha',
    dstAlpha: 1
  }
}

export const culling = {
  enable: false,
  face: 'back'
}

export const depth = {
  enable: false,
  range: [0, 1],
  func: 'less',
  mask: true
}

export const clear = {
  color: [17/255, 17/255, 17/255, 1],
  depth: 1
}
