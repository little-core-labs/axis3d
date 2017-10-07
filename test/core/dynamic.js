import { sharedContext as ctx } from '../utils'
import { DynamicValue } from '../../lib/core'
import test from 'tape'

test("new DynamicValue(ctx, initialState: Object = {}, props: Object = {}) -> DynamicValue",
  ({ok, throws, end}) => {
    ok('function' == typeof DynamicValue,
      "DynamicValue is constructor.")

    throws(() => { DynamicValue() }, Error,
      "Must be called with 'new' operator.")

    ok(new DynamicValue(ctx),
      "DynamicValue must accept Context instance as first argument.")

    throws(() => { new DynamicValue() }, TypeError,
      "First argument cannot be a undefined.")

    throws(() => { new DynamicValue(null) }, TypeError,
      "First argument cannot be a null.")

    throws(() => { new DynamicValue(1) }, TypeError,
      "First argument cannot be a Number.")

    throws(() => { new DynamicValue([]) }, TypeError,
      "First argument cannot be an Array.")

    throws(() => { new DynamicValue(() => void 0) }, TypeError,
      "First argument cannot be a Function.")


    ok(new DynamicValue(ctx, {}),
      "DynamicValue must accept object second argument.")

    throws(() => { new DynamicValue(ctx, 1) }, TypeError,
      "Second argument cannot be a Number.")

    throws(() => { new DynamicValue(ctx, []) }, TypeError,
      "Second argument cannot be an Array.")

    throws(() => { new DynamicValue(ctx, () => void 0) }, TypeError,
      "Second argument cannot be a Function.")

    ok(new DynamicValue(ctx, {}, {}),
      "DynamicValue must accept object third argument.")

    throws(() => { new DynamicValue(ctx, {}, 1) }, TypeError,
      "Third argument cannot be a Number.")

    throws(() => { new DynamicValue(ctx, {}, []) }, TypeError,
      "Third argument cannot be an Array.")

    throws(() => { new DynamicValue(ctx, {}, () => void 0) }, TypeError,
      "Third argument cannot be a Function.")

    end()
  })


test("dynamic.ctx -> Object",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx)
    ok(null !== dynamic.ctx,
      "Context object on instance is not null.")

    ok('object' == typeof dynamic.ctx,
      "Context object on instance is an object.")

    ok(ctx == dynamic.ctx,
      "Context object argument set on instance.")

    end()
  })


test("dynamic.initialState -> Object",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx)
    ok(null !== dynamic.initialState,
      "Initial state object on instance is not null.")

    ok('object' == typeof dynamic.initialState,
      "Initial state object on instance is an object.")

    end()
  })


test("dynamic.valueState -> Object",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx)
    ok(null !== dynamic.valueState,
      "Value state object on instance is not null.")

    ok('object' == typeof dynamic.valueState,
      "Value state object on instance is an object.")

    end()
  })


test("new DynamicValue(ctx, initialState) sets initial state",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx, {value: 123})
    ok(123 === dynamic.initialState.value,
      "Initial state values set on instance initial state object.")

    end()
  })


test("new DynamicValue(ctx, initialState, props) sets initial state and initial value state",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx, {value: 123}, {value: 456, other: 789})
    ok(123 === dynamic.initialState.value,
      "Initial state values set on instance initial state object.")

    ok(456 === dynamic.valueState.value && 789 === dynamic.valueState.other,
      "Value state values set on instance initial state object.")

    ok(456 === dynamic.value && 789 === dynamic.other,
      "Value state values provided in accessor.")

    end()
  })


test("dynamic.set(key, value) -> DynamicValue",
  ({ok, throws, end}) => {
    const dynamic = new DynamicValue(ctx)

    ok(dynamic == dynamic.set('value', 123),
      "returns instance.")

    throws(() => dynamic.set(null), TypeError,
      "Throws TypeError for null key")

    throws(() => dynamic.set(123), TypeError,
      "Throws TypeError for defined key and undefiend value.")

    throws(() => dynamic.set(null, 123), TypeError,
      "Throws TypeError for null key when value is defined.")

    throws(() => dynamic.set(undefined, 123), TypeError,
      "Throws TypeError for undefined key when value is defined.")

    throws(() => dynamic.set({}, 123), TypeError,
      "Throws TypeError for object key when value is defined.")

    throws(() => dynamic.set([], 123), TypeError,
      "Throws TypeError for array key.")

    throws(() => dynamic.set(Function(), 123), TypeError,
      "Throws TypeError for function key value.")

    dynamic.set('value', 456)
    dynamic.set('other', 789)
    ok(456 === dynamic.valueState.value && 789 === dynamic.valueState.other,
      "Value state values set on instance initial state object.")

    ok(456 === dynamic.value && 789 === dynamic.other,
      "Value state values provided in accessor.")

    end()
  })


test("dynamic.unset(key, value) -> DynamicValue",
  ({ok, end}) => {
    const dynamic = new DynamicValue(ctx)
    dynamic.set('value', 123)
    ok(dynamic == dynamic.unset('value'), "returns instance.")
    ok(null == dynamic.valueState.value ,"Value unset in value state object.")
    ok(null == dynamic.value, "Value unset in provided accessor.")
    end()
  })
