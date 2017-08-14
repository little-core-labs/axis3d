export const autoClear = true
export const uniformName = 'frame'
export const blending = {
  equation: 'add',
  enable: false,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' }
}

export const culling = {
  enable: true,
  face: 'back'
}

export const depth = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true
}

export const clear = {
  color: [17/255, 17/255, 17/255, 1],
  depth: 1
}
