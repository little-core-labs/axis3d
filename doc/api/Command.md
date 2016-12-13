*`Function` -> `Command`*

Command
=======

## Synopsis

Base class for most command functions.

## Constructor

```js
Command(run) -> Function
```

## Example

Functions can be created by extending the `Command` class:

```js
class IncrementCommand extends Command {
  constructor(total = 0) {
    super((ctx, value) => {
      // ctx is an object that is safe to add properties to
      return total += value
    })
  }
}

const increment = new IncrementCommand(2)
console.log(increment(1)) // 3
console.log(increment(2)) // 5
```

or by using it directly:

```js
let total = 2
const increment = new Command((ctx, value) => total += value)
console.log(increment(1)) // 3
console.log(increment(2)) // 5
```
