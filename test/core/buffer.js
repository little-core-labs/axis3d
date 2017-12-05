import { sharedContext as ctx } from '../utils'
import * as buffer from '../../lib/core/buffer'
import test from 'tape'

import {
  InvalidArgumentsError,
  MissingContextError,
  BadArgumentError
} from '../../lib/errors'

test("buffer.alloc(ctx: Context, size: Number) -> Float32Array",
  ({ok, throws, end}) => {
    ok('function' == typeof buffer.alloc, "Is a function.")

    throws(() => buffer.alloc(), InvalidArgumentsError,
      "Throws InvalidArgumentsError with no arguments.")

    throws(() => buffer.alloc(0, 1, 2), InvalidArgumentsError,
      "Throws InvalidArgumentsError with more than 2 arguments")

    throws(() => buffer.alloc(0), MissingContextError,
      "Throws MissingContextError with number as first argument.")

    throws(() => buffer.alloc(null), MissingContextError,
      "Throws MissingContextError with null as first argument.")

    throws(() => buffer.alloc([]), MissingContextError,
      "Throws MissingContextError with array as first argument.")

    throws(() => buffer.alloc(Function()), MissingContextError,
      "Throws MissingContextError with function as first argument.")

    throws(() => buffer.alloc(ctx), BadArgumentError,
      "Throws BadArgumentError with undefined second argument.")

    throws(() => buffer.alloc(ctx, true), BadArgumentError,
      "Throws BadArgumentError with boolean as second argument.")

    throws(() => buffer.alloc(ctx, null), BadArgumentError,
      "Throws BadArgumentError with null as second argument.")

    throws(() => buffer.alloc(ctx, {}), BadArgumentError,
      "Throws BadArgumentError with object as second argument.")

    throws(() => buffer.alloc(ctx, []), BadArgumentError,
      "Throws BadArgumentError with array as second argument.")

    throws(() => buffer.alloc(ctx, Function()), BadArgumentError,
      "Throws BadArgumentError with function as second argument.")

    throws(() => buffer.alloc(ctx, NaN), BadArgumentError,
      "Throws BadArgumentError with NaN as second argument.")

    ok(buffer.alloc(ctx, 16) instanceof Float32Array,
      "Returns Float32Array instance.")

    ok(16 == buffer.alloc(ctx, 16).length,
      "Returns Float32Array with size length.")

    end()
  })


test("buffer.free(ctx: Context|buffer: Float32Array, [buffer: Float32Array]) -> void",
  ({ok, throws, end}) => {
    ok('function' == typeof buffer.free, "Is a function.")

    throws(() => buffer.free(), MissingContextError,
      "Throws MissingContextError with no agruments.")

    throws(() => buffer.free(null), MissingContextError,
      "Throws MissingContextError null as first argument.")

    throws(() => buffer.free([]), MissingContextError,
      "Throws MissingContextError array as first argument.")

    throws(() => buffer.free(Function()), MissingContextError,
      "Throws MissingContextError function as first argument.")

    throws(() => buffer.free(0), MissingContextError,
      "Throws MissingContextError number as first argument.")

    throws(() => buffer.free(true), MissingContextError,
      "Throws MissingContextError boolean as first argument.")

    throws(() => buffer.free(ctx, null), BadArgumentError,
      "Throws MissingContextError number as second argument.")

    throws(() => buffer.free(ctx, []), BadArgumentError,
      "Throws MissingContextError array as second argument.")

    throws(() => buffer.free(ctx, {}), BadArgumentError,
      "Throws MissingContextError object as second argument.")

    throws(() => buffer.free(ctx, 0), BadArgumentError,
      "Throws MissingContextError number as second argument.")

    throws(() => buffer.free(ctx, true), BadArgumentError,
      "Throws MissingContextError boolean as second argument.")

    throws(() => buffer.free(ctx, Function()), BadArgumentError,
      "Throws MissingContextError function as second argument.")

    buffer.free(ctx)
    ok(true, "Frees buffers in context.")

    buffer.free(buffer.alloc(ctx, 16))
    ok(true, "Frees allocated buffer for context.")

    buffer.free(ctx, buffer.alloc(ctx, 16))
    ok(true, "Frees allocated buffer for context.")

    end()
  })


test("buffer.count([ctx: Context]) -> Number",
  ({ok, throws, end}) => {
    ok('function' == typeof buffer.count, "Is a function.")

    throws(() => buffer.count(0, 1), InvalidArgumentsError,
      "Throws InvalidArgumentsError with more than 1 argument.")

    throws(() => buffer.count(0), BadArgumentError,
      "Throws BadArgumentError when number is first argument.")

    throws(() => buffer.count(null), BadArgumentError,
      "Throws BadArgumentError when null is first argument.")

    throws(() => buffer.count([]), BadArgumentError,
      "Throws BadArgumentError when array is first argument.")

    throws(() => buffer.count(Function()), BadArgumentError,
      "Throws BadArgumentError when function is first argument.")

    throws(() => buffer.count(true), BadArgumentError,
      "Throws BadArgumentError when boolean is first argument.")

    ok('number' == typeof buffer.count(),
      "Returns a number indicating buffer count for all contexts.")

    ok('number' == typeof buffer.count(ctx),
      "Returns a number indicating buffer count for a context.")

    ok('number' == typeof buffer.count({}),
      "Returns 0 for a fake context object.")

    end()
  })
