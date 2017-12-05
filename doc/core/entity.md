Entity
=======

*[src/core/entity.js](../../src/core/entity.js)*

An `Entity` describes a function the composes 0 or more components into
a single entity that is callable. Components are usually regl commands,
but can be just pure functions that accept arguments and a callback.

## Usage

```js
Entity(ctx, initialState, ...components) -> (args, scope) -> Any
Entity(ctx, initialState, [...components]) -> (args, scope) -> Any
Entity(ctx, ...components) -> (args, scope) -> Any
Entity(ctx, [...components]) -> (args, scope) -> Any
```

The `Entity` class accepts an instance of [Context][Context] as the
first argument. It is callable and accepts the following call
signatures:

```js
// with state and block
entity({prop: 'value'}, () => {
})

// with only block
entity(() => {
})

// with only state
entity({})

// with no arguments
entity()

// as a batch specified by a count
entity(4)

// as a batch specified by an array length with properties for each
// batched entity call
entity([{color: [1,1,1]}, {color: [0.5, 0.5, 0.5]}], ({}, {color}) => {
  // color corresponds to the color property in this batched call
})
```

### Properties

#### entity.isEntity

A `boolean` indicating that this function is an `Entity`.

#### entity.combinedComponents

A `function` that invokes the entity components as a single function.
This should never be called directly.

#### entity.initialState

An `object` containing the initial state of the entity. If an `Entity`
is composed of other entities, then this object is an amalgamation of
those properties.

#### entity.components

An `array` of the original components given to this entity when it was
created.

#### entity.entityId

A `number` ID unique to this entity given when it was created.

### Context Variables

An `Entity` function instance exposes the following context variables.

#### entityId

A `number` ID of the entity.

```js
entity(({entityId}) => { })
```

#### batchId

A `number` ID of a batch entity call. This is also exposed as the third
argument to the callback as seen below.

```js
entity(10, ({batchId}, args batchId) => { }) // 0 ... 9
```


[Context]: context.md#context
[Command]: command.md#command
[regl]: https://github.com/regl-project/regl
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93entity%E2%80%93system
