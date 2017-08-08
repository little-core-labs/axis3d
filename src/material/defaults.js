export const uniformName = 'material'
export const opacity = 1
export const color = [100/255, 110/255, 255/255]

export const wireframePrimitive = 'line strip'
export const primitive = 'triangles'
export const lineWidth = 1

export const blending = {
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' }
}

export const culling = {
  enable: false,
  face: 'back'
}

export const depth = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true
}
