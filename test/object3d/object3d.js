import { MissingContextError, BadArgumentError } from '../../lib/errors'
import { sharedContext as ctx, hasDiff } from '../utils'
import * as defaults from '../../lib/object3d/defaults'
import { Object3D } from '../../lib/object3d'
import test from 'tape'

test("Object3D is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Object3D)
    end()
  })


test("Object3D(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3D(ctx),
      "Object3D with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3D(ctx),
      "Object3D with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: undefined|null) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3D(), MissingContextError,
      "Object3D without arguments throws 'BadArgumentError'.")

    throws(() => Object3D(null), BadArgumentError,
      "Object3D with null argument throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: Array) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3D(Array()), BadArgumentError,
      "Object3D with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: Function) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3D(Function()), BadArgumentError,
      "Object3D with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: Number) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3D(Number()), BadArgumentError,
      "Object3D with invalid 'Context' instance object throws 'BadArgumentError'.")
    end()
  })


test("Object3D(ctx: Context, initialState: Number|Boolean|String) throws BadArgumentError",
  ({throws, end}) => {
    throws(() => Object3D(ctx, 1), BadArgumentError,
      "Object3D with invalid initial state object as number throws 'BadArgumentError'.")

    throws(() => Object3D(ctx, true), BadArgumentError,
      "Object3D with invalid initial state object as boolean throws 'BadArgumentError'.")

    throws(() => Object3D(ctx, "string"), BadArgumentError,
      "Object3D with invalid initial state object as boolean throws 'BadArgumentError'.")

    end()
  })


test("Object3D(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3D(ctx),
       "Object3D constructor returns function.")
    end()
  })


test("Object3D(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Object3D(ctx, {}),
       "Object3D constructor returns function.")
    end()
  })


test("Object3D(ctx: Context) can be called with 'new' operator",
  ({ok, end}) => {
    ok(new Object3D(ctx), "Without error.")
    end()
  })


test("Object3D(ctx: Context) can be called without 'new' operator",
  ({ok, end}) => {
    ok(Object3D(ctx), "Without error.")
    end()
  })
