'use strict'
import { sharedContext as ctx, xtest } from '../utils'
import { Entity } from '../../lib/core'
import test from 'tape'

const zeroes = (n) => Array(n).fill(0)
const sum = (i, n, f) => zeroes(n+1-i).map((_, k) => k+1).reduce(f, 0)

test("Entity is 'function'",
  ({ok, end}) => {
    ok('function' == typeof Entity)
    end()
  })


test("Entity(ctx: undefined|null) throws TypeError",
  ({throws, end}) => {
    throws(() => Entity(), TypeError,
      "Entity without arguments throws 'TypeError'.")

    throws(() => Entity(null), TypeError,
      "Entity with null argument throws 'TypeError'.")
    end()
  })


test("Entity(ctx: Array) throws TypeError",
  ({throws, end}) => {
    throws(() => Entity(Array()), TypeError,
      "Entity with invalid 'Context' instance object throws 'TypeError'.")
    end()
  })


test("Entity(ctx: Function) throws TypeError",
  ({throws, end}) => {
    throws(() => Entity(Function()), TypeError,
      "Entity with invalid 'Context' instance object throws 'TypeError'.")
    end()
  })


test("Entity(ctx: Number) throws TypeError",
  ({throws, end}) => {
    throws(() => Entity(Number()), TypeError,
      "Entity with invalid 'Context' instance object throws 'TypeError'.")
    end()
  })


test("Entity(ctx: Context, initialState: Number|Boolean|String) throws TypeError",
  ({throws, end}) => {
    throws(() => Entity(ctx, 1), TypeError,
      "Entity with invalid initial state object as number throws 'TypeError'.")

    throws(() => Entity(ctx, true), TypeError,
      "Entity with invalid initial state object as boolean throws 'TypeError'.")

    throws(() => Entity(ctx, "string"), TypeError,
      "Entity with invalid initial state object as boolean throws 'TypeError'.")


    end()
  })


test("Entity(ctx: Context) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Entity(ctx),
       "Entity constructor returns function.")
    end()
  })


test("Entity(ctx: Context, initialState: Object) -> Function",
  ({ok, end}) => {
    ok('function' == typeof Entity(ctx, {}),
       "Entity constructor returns function.")
    end()
  })


test("Entity(ctx: Context, initialState: Object) -> Function: that sets " +
  "initial state as defaults on optional arguments object " +
  "exposed in the regl callback.",
  ({ok, plan, end}) => {
    plan(2)

    Entity(ctx, {b: 2})(({}, {b}) => {
      ok(2 == b, "Initial state value merged into argument object.")
    })
    Entity(ctx, {b: 2})({b: 3}, ({}, {b}) => {
      ok(3 == b, "Argument value overwrites initial state defaults.")
    })

    end()
  })

test("Entity(ctx, initialState, ...components: Function) -> Function: calls " +
  " entity components with agruments.",
  ({ok, plan, end}) => {
    const value = 'value'
    const other = 'other'
    const SimpleComponent = (args, next) => {
      ok(value == args.value, "Value in arguments given to component.")
      args.value = other
      next()
    }

    plan(2)

    Entity(ctx, {}, SimpleComponent)({value}, ({}, args) => {
      ok(other == args.value,
         "New value in arguments given to scope after component.")
    })

    end()
  })

test("entity(args: Number, scope: Function) -> void: runs batched entity calls.",
  ({ok, plan, end}) => {
    let j = 0
    let k = 1
    const max = 5
    const batchCount = sum(k, max, (a, b) => a+b)

    plan(1)

    while (k <= max) {
      Entity(ctx)(k++, ({}, _, i) => ++j)
    }

    ok(j == batchCount, "Batch called correctly.")
    end()
  })


test("entity(args: Array, scope: Function) -> void: runs batched entity calls.",
  ({ok, plan, end}) => {
    let j = 0
    let k = 1
    const max = 3
    const batchCount = sum(k, max, (a, b) => a+b)
    const pool = Array(batchCount).fill(0).map(() => ({k: k++}))
    const left = pool.slice(0, Math.ceil(0.5*batchCount))
    const right = pool.slice(left.length)

    plan(1+batchCount)

    Entity(ctx)(left, ({}, {k}, i) => {
      ok('number' == typeof k && k == pool[j].k,
         `Batch ${j} called with correct batched 'k' argument.`)
      ++j
    })

    Entity(ctx)(right, ({}, {k}, i) => {
      ok('number' == typeof k && k == pool[j].k,
         `Batch ${j} called with correct batched 'k' argument.`)
      ++j
    })

    ok(j == batchCount, "Batch called correctly.")
    end()
  })


test("entity(scope: Function) -> void: sets 'context.entityId' property'.",
  ({ok, plan, end}) => {
    plan(2)

    Entity(ctx)(({entityId}) => {
      ok('number' == typeof entityId, "context.entityId is a 'number'.")
      ok(entityId > 0, "context.entityId is greather than 0`.")
    })

    end()
  })

test("Entity(ctx, ...components) -> entity(scope) -> void: " +
  "Calls components in order.",
  ({ok, plan, end}) => {
    let calls = 0
    const expected = 3
    plan(expected + 1)

    Entity(ctx, first, second, third)(() => {
      ok(calls++ == expected, "Callback called after all components.")
    })

    function first(args, next) {
      ok(1 == ++calls, "First component called.")
      next()
    }

    function second(args, next) {
      ok(2 == ++calls, "Second component called.")
      next()
    }

    function third(args, next) {
      ok(3 == ++calls, "Third component called.")
      next()
    }

    end()
  })

