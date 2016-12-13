*[`Command`][Command] -> `Object3DCommand`*

Object3DCommand
===============

## Synopsis

Base class for commands that handle 3D positional data. The function
returned by this class injects a [regl][regl] context when called.

## Usage

### API

```js
import Object3D from 'axis3d/object'
import { Context } from 'axis3d'
const ctx = new Context()
const object = Object3D(ctx)
```

### Class

```js
import { Object3DCommand } from 'axis3d/object'
class MyCommand extends Object3DCommand { }
```

## Constructor

```js
Object3DCommand(ctx, opts) -> Function
```

where `ctx` is an instance of a [Context][Context] object and `opts` is
an optional object containing:

* `rotation` - Initial rotation quaternion (Default: `[0, 0, 0, 1]`).
* `position` - Initial 3-component position vector (Default: `[0, 0, 0]`).
* `scale` - Initial 3-component scale vector (Default: `[1, 1, 1]`).

## Regl Context

The following regl context variables are exported:

* `transform` - The world transform matrix
* `model` - The local transform matrix
* `id` - Object ID

## See Also

* [Command][Command]
* [regl][regl]

[Context]: Context.md
[Command]: Command.md
[regl]: https://github.com/regl-project/regl
