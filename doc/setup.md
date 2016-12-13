Axis3D Setup
============

Axis3D is built on [regl][regl] and a variety of modules. It is written
in ES6. It makes uses of [babel][babel], [browserify][browserify],
[rollupify][rollupify], and [uglifyify][uglifyify] for transpiling,
optimizing, and minifying builds of the source code. Source
code is transpiled before being published to [npm][npm/axis3d].

# Table Of Contents

- [Building from source](#build-source)
  - [Prerequisites](#build-source-prerequisites)
- [Development](#development)
- [See Also](#see-also)

# <a name="build-source"></a> Building from source

## <a name="build-source-prerequisites"></a> Prerequisites

Please ensure the following commandline utilities are installed before
continuing:

* `git`
* `npm`
* `node`
* `make`

Before building Axis3D from source, please clone down the latest stable
release.

```sh
$ git clone -b stable git@github.com:littlstar/axis3d.git
```

From the root of the project execute `make` to install dependencies and build
the project.

```sh
$ cd axis3d
$ make
```

* A minified and optimized distribution build should be built to the `dist/` directory.
* A transpiled build of the source should be built to the `lib/` directory.
* A development build should be built to the `build/` directory.

To clean the project of built dependencies, execute `make clean` from
the root of the project.

## <a name="development"></a> Development

Most development is tested with the examples living in the [examples][examples]
directory. The source of the project and most of the examples are written in
ES6 which requires [babel][babel] to transpile the source into something the
browser can safely execute. This process is very cumbersome to test so we make
use of [budo][budo] which provides live reload and module caching built-in.

Running any example in the `example` directory can be done with:

```sh
$ make example/<example>
```

Starting the hello world example is done with:

```sh
$ make example/hello-world
```

See [Makefile Targets](makefile.md) for more information `make`
targets.

# <a name="see-also"></a> See Also

* [Installation](instll.md)
* [Getting Started](getting-started.md)
* [Hello World](hello-world.md)
* [Makefile Targets](makefile.md)

[regl]: https://github.com/regl-project/regl
[budo]: https://github.com/mattdesl/budo
[babel]: https://github.com/babel/babel
[rollupify]: https://github.com/nolanlawson/rollupify
[uglifyify]: https://github.com/hughsk/uglifyify
[browserify]: https://github.com/substack/node-browserify

[npm/axis3d]: https://www.npmjs.com/package/axis3d
[examples]: ../examples/
