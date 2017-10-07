import { Context } from '../../lib/core'
import assert from 'assert'
import test from 'tape'

const destroy = (ctx) => {
  ctx.destroy()
  assert.ok(true === ctx.isDestroyed, "Failed to destroy context.")
  return ctx
}

test("new Context(opts: Object = {}, createRegl: Function = regl) -> Context",
  ({ok, throws, end}) => {
    ok('function' == typeof Context,
      "Context is constructor.")

    throws(() => { Context() }, Error,
      "Must be called with 'new' operator.")

    ok(destroy(new Context(null)),
      "First argument can be null.")

    ok(destroy(new Context({})),
      "First argument can be a Object.")

    throws(() => { new Context(1) }, Error,
      "First argument cannot be a Number.")

    throws(() => { new Context([]) }, Error,
      "First argument cannot be an Array.")

    throws(() => { new Context(() => void 0) }, Error,
      "First argument cannot be a Function.")

    ok(destroy(new Context(null, null)),
      "Second argument can be null.")

    ok(destroy(new Context(null, () => void 0)),
      "Second argument can be a Function.")

    throws(() => { new Context({}, true) }, Error,
      "Second argument cannot be a Boolean.")

    throws(() => { new Context(1) }, Error,
      "Second argument cannot be a Number.")

    throws(() => { new Context([]) }, Error,
      "Second argument cannot be an Array.")

    throws(() => { new Context(true) }, Error,
      "Second argument cannot be a Boolean.")

    end()
  })


test("Context.kDefaulOptionaltExtensions -> Array<String>",
  ({ok, end}) => {
    ok(Array.isArray(Context.kDefaulOptionaltExtensions), "Is an Array.")
    ok(Context.kDefaulOptionaltExtensions.every((ex) => 'string' == typeof ex),
      "Contains String elements.")
    end()
  })


test("context.isDestroyed -> Boolean",
  ({ok, end}) => {
    const ctx = new Context()
    ok('boolean' == typeof ctx.isDestroyed, "Is a Boolean.")
    ok(false === ctx.isDestroyed, "Is false after instantiation.")
    destroy(ctx)
    ok(true === ctx.isDestroyed, "Is true after destruction.")
    end()
  })


test("context.hasFocus -> Boolean",
  ({ok, end}) => {
    const ctx = new Context()
    ok('boolean' == typeof ctx.hasFocus, "Is a Boolean.")
    ok(false === ctx.hasFocus, "Is false after instantiation.")
    destroy(ctx)
    ok(false === ctx.hasFocus, "Is false after destruction.")
    end()
  })


test("context.domElement -> HTMLCanvasElement",
  ({ok, end}) => {
    const ctx = new Context()
    ok('object' == typeof ctx.domElement, "Is an object.")
    ok(ctx.domElement instanceof HTMLCanvasElement,
      "Is instance of a HTMLCanvasElement.")
    destroy(ctx)
    ok(null === ctx.domElement, "Is null after destruction.")
    end()
  })


test("context.regl -> Function",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.regl, "Is a function.")
    ok('function' == typeof ctx.regl({}),
      "When called with object as first argument, returns a function.")
    destroy(ctx)
    ok(null === ctx.regl, "Is null after destruction.")
    end()
  })


test("context.gl -> WebGLRenderingContext",
  ({ok, end}) => {
    const ctx = new Context()
    ok('object' == typeof ctx.gl, "Is an object.")
    ok(ctx.gl instanceof WebGLRenderingContext,
      "Is an instance of WebGLRenderingContext.")
    destroy(ctx)
    ok(null === ctx.gl, "Is null after destruction.")
    end()
  })


test("context.focus() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.focus, "Is a function.")
    ok(ctx == ctx.focus(), "Returns instance when called.")
    ok(true === ctx.hasFocus, "Toggles ctx.hasFocus to true.")
    destroy(ctx)
    end()
  })


test("context.blur() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.focus, "Is a function.")
    ok(ctx == ctx.blur(), "Returns instance when called.")
    ok(false === ctx.hasFocus, "Toggles ctx.hasFocus to false.")
    destroy(ctx)
    end()
  })


test("context.destroy() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ctx.destroy()
    ok(false === ctx.hasFocus, "Sets focus to false.")
    ok(true === ctx.isDestroyed, "Sets context.isDestroyed to true.")
    ok(null === ctx.domElement, "Sets context.domElement to null.")
    ok(null === ctx.regl, "Sets context.regl to null.")
    ok(null === ctx.gl, "Sets context.gl to null.")
    end()
  })


test("context.refresh() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.refresh, "Is a function.")
    ok(ctx == ctx.refresh(), "Returns instance when called.")
    destroy(ctx)
    end()
  })


test("context.flush() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.flush, "Is a function.")
    ok(ctx == ctx.flush(), "Returns instance when called.")
    destroy(ctx)
    end()
  })


test("context.poll() -> Context",
  ({ok, end}) => {
    const ctx = new Context()
    ok('function' == typeof ctx.poll, "Is a function.")
    ok(ctx == ctx.poll(), "Returns instance when called.")
    destroy(ctx)
    end()
  })
