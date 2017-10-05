entity
=======

*[src/core/entity.js](../../src/core/entity.js)*

Creates a function with initial (default) state that is given to optional
components when invoked as default argument state.


## Entity

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
entity({}

// with no arguments
entity()
```

### Context Variables

#### entityID



[Context]: context.md#context
[Command]: command.md#command
[regl]: https://github.com/regl-project/regl
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93entity%E2%80%93system


