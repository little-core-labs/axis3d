command
=======

*[src/core/command.js](../../src/core/command.js)*

A command extends the built-in `Function` class directly and
encapsulates a given function for later execution. Most components in
Axis3D are extensions of this class.

## Command

```js
new Command((a, b) => a + b)
```

The `Command` class extends the built-in `Function` class. It accepts a
function that is converted to a string and given to the `super`
(`Function`).
