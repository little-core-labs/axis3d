Drawing A Scene
===============

In this tutorial you will learn the basics of drawing a scene in axis3d.
It is written in ES6 and assumes the reader is familiar with [node.js][nodejs]
and browser build systems like [browserify][browserify] and [budo][budo].

## Recommended index.html

Below is a recommended HTML structure for getting started with axis3d. 

```html
<!doctype html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>axis3d scene</title>
    <style>
      * { margin: 0; padding: 0; }
      canvas { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <script type="text/javascript" src="/path/to/build.js"></script>
  </body>
</html>
/html>
```

## Creating a context

Before you can draw anything with axis3d, a context is needed. A context
is an instance of the [Context][Context] class. It accepts a lot of
options, but uses sane defaults. You can provide a created `<canvas>`
DOM element, otherwise one is [created for you that occupies the entire
window][regl-fullscreen-canvas]. Below is an example of creating a
context with default options. The `<canvas>` DOM element is appended to
the DOM when the page has loaded.

```js
const { Context } = require('axis3d')
const ctx = new Context()
```

You can see a more complex example in this [gist][gist-creating-a-context].

A [context][Context] is needed to create components in axis3d.
[Geometry][Geometry] and a few other core classes may not need it, but
it is required nonetheless.

##


[gist-creating-a-context]: http://requirebin.com/?gist=01d2865679aec9ba3bb75d75806d712c

[regl-fullscreen-canvas]: https://github.com/regl-project/regl/blob/gh-pages/API.md#as-a-fullscreen-canvas
[browserify]: https://github.com/substack/node-browserify
[nodejs]: https://github.com/nodejs/node
[budo]: https://github.com/mattdesl/budo

[Context]: tbd
