export * as material from './material'
export * as fragment from './fragment'
export * as texture from './texture'
export * as varying from './varying'
export * as vertex from './vertex'
export * as camera from './camera'
export * as common from './common'
export * as mesh from './mesh'
export * as time from './time'

for (const lib in exports) {
  for (const path in exports[lib]) {
    const newPath = path.replace(`${__dirname}/${lib}`, '')
    exports[lib][newPath] = exports[lib][path]
    delete exports[lib][path]
  }
}
