Makefile Targets
================

# Table Of Contents

- [Common Targets](#common-targets)
- [Variables](#configurable-variables)
  - [YARN_OR_NPM](#var-YARN-OR-NPM)
  - [CWD](#var-CWD)
  - [BIN](#var-BIN)
  - [BROWSERIFY](#var-BROWSERIFY)
  - [BABEL](#var-BABEL)
  - [BIN](#var-BIN)
  - [STANDARD](#var-STANDARD)
  - [GLOBAL_NAMESPACE](#var-GLOBAL-NAMESPACE)
  - [BABEL_ENV](#var-BABEL-ENV)
  - [BROWSERIFY_TRANSFORM](#var-BROWSERIFY-TRANSFORM)
- [Targets](#targets)
  - [all](#target-all)
  - [lib](#target-lib)
  - [build](#target-build)
  - [dist](#target-dist)
  - [example/\*](#target-example)
  - [link](#target-link)
- [See Also](#see-also)

## <a name="common-targets"></a> Common Targets

* `make` - Just build everything
* `make example/*` - Runs an example and on budo web server
* `make link` - Link ES6 module globally

# <a name="configurable-variables"></a> Configurable Variables

The following `Makefile` variables are configurable.

## <a name="var-YARN-OR-NPM"></a> YARN_OR_NPM

Set this to the path of yarn or npm if not found in path.

*default:*
```make
YARN_OR_NPM := $(shell which yarn npm | head -1)
```

## <a name="var-CWD"></a> CWD

Current working build directory.

*default:*
```make
CWD := $(shell pwd)
```

## <a name="var-BIN"></a> BIN

Node modules bin directory.

*default:*
```make
BIN := node_modules/.bin
```

## <a name="var-BROWSERIFY"></a> BROWSERIFY

Path to `browserify` bin file.

*default:*
```make
BROWSERIFY := $(BROWSERIFY)/browserify
```

## <a name="var-BABEL"></a> BABEL

Path to `babel`.

*default:*
```make
BABEL := $(BIN)/babel
```

## <a name="var-BIN"></a> BIN

Path to `budo`.

*default:*
```make
BUDO := $(BIN)/budo
```

## <a name="var-STANDARD"></a> STANDARD

Path to `standard`.

*default:*
```make
STANDARD := $(BIN)/standard
```

## <a name="var-GLOBAL-NAMESPACE"></a> GLOBAL_NAMESPACE

Global namespace target.

*default:*
```make
GLOBAL_NAMESPACE = Axis
```

## <a name="var-BABEL-ENV"></a> BABEL_ENV

Babel ENV.

*default:*
```make
BABEL_ENV ?= commonjs
```

## <a name="var-BROWSERIFY-TRANSFORM"></a> BROWSERIFY_TRANSFORM

Browserify transform.

*default:*
```make
BROWSERIFY_TRANSFORM := -t babelify
```

# <a name="targets"></a> Targets

## <a name="target-all"></a> all

Builds everything. (*Default*)

```make
.PHONY: all
all: lib build dist
```

## <a name="target-lib"></a> lib

Transpiles all files with babel.

```make
lib: $(SRC) | node_modules
```

## <a name="target-build"></a> build

Builds axis.js development build.

```make
build: build/axis.js
```

## <a name="target-dist"></a> dist

Builds a minified and optimized distribution javascript file.

```make
dist: dist/axis.min.js
```

## <a name="target-example"></a> example/*

Runs an example and a budo web server

```make
example/*:
```

## <a name="target-clean"></a> clean

Cleans all built files.

```make
.PHONY: clean
clean:
	rm -rf lib
	rm -rf dist
	rm -rf build
```

## <a name="target-lint"></a> lint

Run standard against the codebase.

```make
.PHONY: lint
lint: node_modules
```

## <a name="target-publish"></a> publish

Publish package.

```make
.PHONY: publish
publish: lib
```

## <a name="target-link"></a> link

Link lib (es5) globally.

```make
.PHONY: link
link: lib
```

# <a name="see-also"></a> See Also

* [Setup](setup.md)
* [Installation](install.md)

