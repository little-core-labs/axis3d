export * as material from './material'
export * as camera from './camera'
export * as common from './common'
export * as mesh from './mesh'

for (const lib in exports) {
  for (const path in exports[lib]) {
    const newPath = path.replace(`${__dirname}/${lib}`, '')
    exports[lib][newPath] = exports[lib][path]
    delete exports[lib][path]
  }
}

console.log(exports);
