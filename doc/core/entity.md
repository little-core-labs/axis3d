entity
=======

*[src/core/entity.js](../../src/core/entity.js)*

An Entity instance is just a function that inject a [regl][regl] context. It
accepts a state object and a block, or "next" function that is given to
the internal regl command that inject a context containing the entity ID
created when an Entity is created.

## Entity

```js
new Entity(ctx)
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


