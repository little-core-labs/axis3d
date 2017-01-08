Installing Axis3D
=================

Axis3D can be installed into your project in various ways. Axis3D is
published to [npm][npm/axis3d], [released on Github][releases], and
installable with package managers like [yarn][yarn] and [npmi][npmi].

# Table Of Contents

- [NPM](#npm)
- [Github](#github)
- [Yarn](#yarn)
- [From Source](#source)
  - [Distribution Build](#source-distribution-build)
  - [Link With NPM](#source-link-with-npm)
- [See Also](#see-also)

# <a name="npm"></a> NPM

Installing Axis3D from npm is as simple as:

```sh
$ npm install --save axis3d
```

Installing Axis3D at a specific version:

```sh
$ npm install --save axis3d@1.0.0
```

# <a name="github"></a> Github

Installing Axis3D with npm from Github:

```sh
$ npm install --save https://github.com/littlstar/axis3d.git
```

Installing Axis3D with npm from Github at a specific version:

```sh
$ npm install --save https://github.com/littlstar/axis3d.git#1.0.0
```

or shorthand: (*not recommended*; [see this issue][yarn-issue])

```sh
$ npm install --save littlstar/axis3d
```

# <a name="yarn"></a> Yarn

Installing with [yarn][yarn] is as simple as:

```sh
$ yarn add axis3d
```

or from github:

```sh
$ yarn add https://github.com/littlstar/axis3d.git
```

# <a name="source"></a> From Source

Make sure you [build from source](setup.md#build-source) first.

## <a name="source-distribution-build"></a> Distribution Build

An amalgamated distribution build that is optimized and minified is
built to `dist/axis3d.min.js`. A development build is built to
`dist/axis.js`. It can be imported to any existing project. It is exported
as a [commonjs][commonjs] module falling back to a global definition with
the namespace `Axis`.

This file may then be included in a `<script>` tag:

```html
<script src="/path/to/axis3d.min.js" type="text/javascript"></script>
```

where `Axis` is now a global object.

## <a name="source-link-with-npm"></a> Link with npm

A transpiled build is built to the `lib/` directory. The source directory
structure is preserved and a `package.json` file is placed with it.
The `lib/` directory is a module that is now ES5 and can be linked safely.

```sh
$ cd lib
$ npm link
```

There is also an equivalent `make` target available:

```sh
$ make link
```

# <a name="see-also"></a> See Also

* [Setup](setup.md)
* [Getting Started](getting-started.md)
* [Makefile Targets](makefile.md)

[yarn-issue]: https://github.com/yarnpkg/yarn/issues/1921
[npm/axis3d]: https://www.npmjs.com/package/axis3d
[commonjs]: https://webpack.github.io/docs/commonjs.html
[releases]: https://github.com/littlstar/axis3d/releases
[npmi]: https://github.com/maxleiko/npmi
[yarn]: https://github.com/yarnpkg/yarn
