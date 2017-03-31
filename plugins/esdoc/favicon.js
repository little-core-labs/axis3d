'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const cp = require('cp')

/**
 * The name of the favicon file.
 */

const kFavIconName = 'favicon.png'

/**
 * The resolved favicon path.
 */

const kFavIconSourcePath = path.resolve(__dirname, '../../public', kFavIconName)

/**
 * The resolved favicon destination path.
 */

const kFavIconDestinationPath =
  path.resolve(__dirname, '../../esdoc', kFavIconName.replace('png', 'ico'))

/**
 * This plugin simply moves the favicon.png file found in the
 * public/ directory into the built esdoc/ directory.
 */

Object.assign(exports, {
  onComplete() {
    cp(kFavIconSourcePath, kFavIconDestinationPath, (err) => {
      if (err) {
        console.error(err.stack || err)
      }
    })
  }
})
