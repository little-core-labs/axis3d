import { MissingContextError, BadArgumentError } from '../../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../../utils'
import * as defaults from '../../../../lib/object3d/defaults'
import isTypedArray from 'is-typedarray'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'
import test from 'tape'

import {
  Object3DTransformMatrixContext ,
  Object3DTranslationMatrixContext,
  Object3DScaleMatrixContext,
  Object3DRotationMatrixContext,
  Object3DLocalMatrixContext,
} from '../../../../lib/object3d/context/matrix'

test("Object3DTransformMatrixContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DTransformMatrixContext)
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTransformMatrixContext(ctx),
      "Object3DTransformMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTransformMatrixContext(ctx),
      "Object3DTransformMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTransformMatrixContext(), MissingContextError,
      "Object3DTransformMatrixContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DTransformMatrixContext(null), BadArgumentError,
      "Object3DTransformMatrixContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTransformMatrixContext(Array()), BadArgumentError,
      "Object3DTransformMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTransformMatrixContext(Function()), BadArgumentError,
      "Object3DTransformMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTransformMatrixContext(Number()), BadArgumentError,
      "Object3DTransformMatrixContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DTransformMatrixContext(ctx, 1), BadArgumentError,
      "Object3DTransformMatrixContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DTransformMatrixContext(ctx, true), BadArgumentError,
      "Object3DTransformMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DTransformMatrixContext(ctx, "string"), BadArgumentError,
      "Object3DTransformMatrixContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTransformMatrixContext(ctx),
       "Object3DTransformMatrixContext constructor returns function.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DTransformMatrixContext(ctx, {}),
       "Object3DTransformMatrixContext constructor returns function.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DTransformMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DTransformMatrixContext(ctx), "Without error.")
    end()
  })


test("Object3DTransformMatrixContext(ctx: Context) computes transformMatrix " +
  "from localMatrix and parent transformMatrix.",
  ({ok, plan, end}) => {
    //plan(3)
    const translationContext = Object3DTranslationMatrixContext(ctx)
    const rotationContext = Object3DRotationMatrixContext(ctx)
    const scaleContext = Object3DScaleMatrixContext(ctx)
    const localContext = Object3DLocalMatrixContext(ctx)
    const transformContext = Object3DTransformMatrixContext(ctx)

    const position = [1,2,3]
    const scale = [2,2,2]
    const rotation = quat.setAxisAngle([], [1, 0, 0], Math.PI)


    translationContext({position}, () => {
      rotationContext({rotation}, () => {
        scaleContext({scale}, () => {
          localContext(({localMatrix}) => {
            transformContext(({transformMatrix}) => {
              ok(isTypedArray(transformMatrix), "transformMatrix is typed array.")
              ok(false == hasDiff(transformMatrix, localMatrix),
                "transformMatrix and localMatrix are equal without parent transformMatrix.")
              const expectedTransformMatrix = mat4.copy([], localMatrix)
              mat4.multiply(expectedTransformMatrix, transformMatrix, localMatrix)

              transformContext(({transformMatrix}) => {
                ok(false == hasDiff(transformMatrix, expectedTransformMatrix),
                "Nested transformContext matrix is computed correctly.")
              })
            })
          })
        })
      })
    })
    end()
  })
