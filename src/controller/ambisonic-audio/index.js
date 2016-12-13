'use strict'

/**
 * Module dependencies.
 */

import { Omnitone as omnitone } from 'omnitone'
import defaultAudioContext from 'audio-context'
import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import mat3 from 'gl-mat3'
import raf from 'raf'

import {
  XVector3,
  YVector3,
  ZVector3,
} from '../../math/vector'

import {
  Quaternion,
  Vector,
} from '../../math'

import { AbstractControllerCommand } from '../abstract-controller'
import { define, radians } from '../../utils'

/**
 * AmbisonicAudioControllerCommand function.
 *
 * @see AmbisonicAudioControllerCommand
 */

module.exports = exports = (...args) => new AmbisonicAudioControllerCommand(...args)

/**
 * AmbisonicAudioControllerCommand class
 *
 * @public
 * @class AmbisonicAudioControllerCommand
 * @extends AbstractControllerCommand
 */

export class AmbisonicAudioControllerCommand extends AbstractControllerCommand {
  constructor(ctx, {
    audioContext = defaultAudioContext,
    media = null,
  } = {}) {
    let isFoaDecoderInitialized = false
    let foaDecoder = null

    const {regl} = ctx
    const injectContext = regl({
      context: {
        foaDecoder: () => foaDecoder,
        audioContext: ({audioContext: currentAudioContext}) => {
          return currentAudioContext || audioContext
        },
      }
    })

    super(ctx)

    audio && audio.on('load', () => {
      const source = this.source

      if (!audio || !source) {
        // @TODO(werle) - log error
        return
      } else if (null != foaDecoder) {
        // @TODO(werle) - log error
        return
      }

      foaDecoder = omnitone.createFOADecoder(
        audioContext,
        audio.domElement,
        Object.assign({ channelMap: [0, 1, 2, 3] }, opts)
      )

      foaDecoder.initialize()
      .then(() => { isFoaDecoderInitialized = true })
      .catch((err) => { emit('error', err) })

      let foaDecoderLoopFrame = null
      let foaDecoderLoop = () => {
        if (foaDecoderLoopFrame) {
          foaDecoderLoopFrame = raf(foaDecoderLoop)
        }

        const mat = []
        mat3.fromQuat(mat, source.rotation)
        mat3.translate(mat, mat, vec3.negate([], audio.position))
        foaDecoder.setRotationMatrix(mat)
      }

      audio.on('playing', () => {
        if (foaDecoderLoopFrame) {
          raf.cancel(foaDecoderLoopFrame)
          foaDecoderLoopFrame = null
        }

        foaDecoderLoopFrame = raf(foaDecoderLoop)
      })

      audio.on('pause', () => {
        if (foaDecoderLoopFrame) {
          raf.cancel(foaDecoderLoopFrame)
          foaDecoderLoopFrame = null
        }
      })
    })
  }
}
