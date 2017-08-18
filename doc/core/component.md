component
=======

*[src/core/component.js](../../src/core/component.js)*

A Component is a [Command][Command] that composes one or more components and
functions into a single function that is callable like a function.
An initial or default state can be given which is injected into the block
context object each call unless overwritten by incoming arguments.


## Component

```js
new Component(ctx, initialState, ...children)
```

The `Component` class accepts an instance of [Context][Context] as the
first argument, optional initial state as the second agrument, and the
rest of the arguments can be instances of `Component` or functions that
have the signature `(state, block) => { ... }`.

Every component is composed into the following shape:

```js
componentA(() => {
  componentB(() => {
    componentC(() => {
    })
  })
})
```

when constructed like:

```js
const component = new Component(ctx, {}, componentA, componentB, componentC)
```

and called like:

```js
component()
```

### Functional

Components act as middleware to each other, with the prior component
being the parent scope of the next component. Pure components are just
functions that accept a `state` object and `block`, or "next" function,
when called just calls the next component in the chain.

Extending the `Component` class allows for the creation of a
[regl][regl] command which injects context variables. This coupled with
how components are composed into scoped calls makes this quite useful.

### Entity-Component

Components can essentially describe scoped state based on the calling
state, if given. This can mean injecting shader attributes and uniforms,
computing transform state, or just making a draw call. They are kind of like
entities that are also components. They are self contained, but can also augment
each other. An intance of a `Component` that does nothing is basically
just an entity. In a pure [entity-component system, or ECS][ecs], an entity is
just something that has an ID, and acts as a container of components that
actually describe what the entity is.

### Initial State

The initial state given to the `Component` constructor is merged with the
incoming argumetns when the component is called. This allows components to
have default state. See example below.

### Example

```js
const component = new Component(ctx, {color: [0.2, 0.3, 0.4]}, (state, block) => {
  const {color} = state
  block(state) // keep chain
})

component() // color = 0.2, 0.3, 0.4]}
component({color: [1, 0, 0]}) // color = [1, 0, 0]
```


[Context]: context.md#context
[Command]: command.md#command
[regl]: https://github.com/regl-project/regl
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system


