import { MissingContextError, BadArgumentError } from '../../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../../utils'
import { Object3DContext } from '../../../lib/object3d/context/context'
import * as defaults from '../../../lib/object3d/defaults'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'
import test from 'tape'

test("Object3DContext is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3DContext)
    end()
  })


test("Object3DContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DContext(ctx),
      "Object3DContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DContext(ctx),
      "Object3DContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DContext(), MissingContextError,
      "Object3DContext without arguments throws 'BadArgumentError'.")

    throws(() => Object3DContext(null), BadArgumentError,
      "Object3DContext with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DContext(Array()), BadArgumentError,
      "Object3DContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DContext(Function()), BadArgumentError,
      "Object3DContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DContext(Number()), BadArgumentError,
      "Object3DContext with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3DContext(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3DContext(ctx, 1), BadArgumentError,
      "Object3DContext with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3DContext(ctx, true), BadArgumentError,
      "Object3DContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3DContext(ctx, "string"), BadArgumentError,
      "Object3DContext with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3DContext(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DContext(ctx),
       "Object3DContext constructor returns function.")
    end()
  })


test("Object3DContext(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3DContext(ctx, {}),
       "Object3DContext constructor returns function.")
    end()
  })


test("Object3DContext(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3DContext(ctx), "Without error.")
    end()
  })


test("Object3DContext(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3DContext(ctx), "Without error.")
    end()
  })


test("Object3DContext(ctx: Context) exposes position, rotation, and scale "+
  "context variables with defaults.",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale ()
    const context = Object3DContext(ctx)
    context(({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(Array.isArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, defaults.position), "Position context variable has correct default value.")

      ok(scale, "Scale context variable is defined.")
      ok(Array.isArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, defaults.scale), "Scale context variable has correct default value.")

      ok(rotation, "Rotation context variable is defined.")
      ok(Array.isArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, defaults.rotation), "Rotation context variable has correct default value.")

    })
    end()
  })


test("Object3DContext(ctx: Context) exposes position, rotation, and scale "+
  "with repsect to input arguments.",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale ()
    const expected = {
      position: [1,2,3], rotation: [1.57,0,0,-1.57], scale: [2,2,2]
    }
    const context = Object3DContext(ctx)
    context(expected, ({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(Array.isArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, expected.position), "Position context variable has correct value from input arguments.")

      ok(scale, "Scale context variable is defined.")
      ok(Array.isArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, expected.scale), "Scale context variable has correct value from input arguments.")

      ok(rotation, "Rotation context variable is defined.")
      ok(Array.isArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, expected.rotation), "Rotation context variable has correct value from input arguments.")

    })
    end()
  })


test("Object3DContext(ctx: Context , initialState: Object) uses initial " +
  "state as defaults when called",
  ({ok, plan, end}) => {
    plan(12) // position, rotation scale ()
    const expected = {
      position: [1,2,3], rotation: [1.57,0,0,-1.57], scale: [2,2,2]
    }
    const context = Object3DContext(ctx, expected)
    context(({position, rotation, scale}) => {

      ok(position, "Position context variable is defined.")
      ok(Array.isArray(position), "Position context variable is an array.")
      ok(3 == position.length, "Position context variable is an array with 3 components.")
      ok(false == hasDiff(position, expected.position), "Position context variable has correct value from initial state.")

      ok(scale, "Scale context variable is defined.")
      ok(Array.isArray(scale), "Scale context variable is an array.")
      ok(3 == scale.length, "Scale context variable is an array with 3 components.")
      ok(false == hasDiff(scale, expected.scale), "Scale context variable has correct value from initial state.")

      ok(rotation, "Rotation context variable is defined.")
      ok(Array.isArray(rotation), "Rotation context variable is an array.")
      ok(4 == rotation.length, "Rotation context variable is an array with 3 components.")
      ok(false == hasDiff(rotation, expected.rotation), "Rotation context variable has correct value from initial state.")

    })
    end()
  })

test("Object3DContext(ctx: Context) exposes matrix and transform "+
  "context variables.",
  ({ok, plan, end}) => {
    plan(6)
    const context = Object3DContext(ctx)
    context(({matrix, transform}) => {

      ok(matrix, "Matrix context variable is defined.")
      ok(Array.isArray(matrix) || matrix instanceof Float32Array, "Matrix context variable is an array.")
      ok(16 == matrix.length, "Matrix context variable is an array with 16 components.")

      ok(transform, "Transform context variable is defined.")
      ok(Array.isArray(transform) || transform instanceof Float32Array, "Transform context variable is an array.")
      ok(16 == transform.length, "Transform context variable is an array with 16 components.")

    })
    end()
  })


test("Object3DContext(ctx: Context) computes  matrix and transform " +
  "correctly.",
  ({ok, plan, end}) => {
    plan(6)
    const args = {
      position: [1, 2, 3],
      scale: [2, 2, 2],
      rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI)
    }

    const expected = {
      matrix: new Float32Array(16),
      transform: new Float32Array(16)
    }

    mat4.identity(expected.matrix)
    mat4.identity(expected.transform)

    mat4.scale(expected.matrix,
      mat4.fromRotationTranslation([], args.rotation, args.position),
      args.scale)

    mat4.copy(expected.transform, expected.matrix)

    Object3DContext(ctx)(args, ({matrix, transform}) => {
      ok(false == hasDiff(matrix, expected.matrix), "Matrix value computed correctly.")
      ok(false == hasDiff(transform, expected.transform), "Transform value computed correctly.")

      mat4.multiply(expected.transform, transform, matrix)
      Object3DContext(ctx)(args, ({matrix, transform}) => {
        ok(false == hasDiff(matrix, expected.matrix), "Scoped matrix value computed correctly.")
        ok(false == hasDiff(transform, expected.transform), "Scoped transform value computed correctly.")

        mat4.multiply(expected.transform, transform, matrix)
        Object3DContext(ctx)(args, ({matrix, transform}) => {
          ok(false == hasDiff(matrix, expected.matrix), "Nested scoped matrix value computed correctly.")
          ok(false == hasDiff(transform, expected.transform), "Nested scoped transform value computed correctly.")
        })
      })
    })
    end()
  })
