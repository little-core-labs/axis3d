##
# Current working build directory
#
CWD := $(shell pwd)

##
# Node modules bin directory
#
BIN := node_modules/.bin

##
# Path to `browserify' bin file
#
BROWSERIFY := $(BIN)/browserify

##
# Path to `babel`
#
BABEL := $(BIN)/babel

##
# Path to `budo`
#
BUDO := $(BIN)/budo

##
# Path to `standard`
#
STANDARD := $(BIN)/standard

##
# Module source (js)
#
SRC := $(wildcard src/*.js src/*/*.js src/*/*/*.js)

##
# Main javascript entry
#
SRC_MAIN = src/index.js

##
# Main compiled javascript entry
#
LIB_MAIN = lib/index.js

##
# Global namespace target
#
GLOBAL_NAMESPACE = Axis

##
# Babel ENV
#
BABEL_ENV ?= commonjs

##
# Browserify transform
#
BROWSERIFY_TRANSFORM := -t babelify

##
# Ensures parent directory is built
#
define BUILD_PARENT_DIRECTORY
	mkdir -p $(dir $@)
endef

##
# Builds everything
#
all: lib dist

##
# Builds all files
#
lib: $(SRC) | node_modules
	BABEL_ENV=$(BABEL_ENV) $(BABEL) $(CWD)/src --out-dir $@ --source-maps inline
	cp package.json $@

##
# Builds all dist files
#
dist: dist/axis.js

##
# Builds javascript dist file
#
dist/axis.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_TRANSFORM) -t uglifyify -t rollupify --standalone $(GLOBAL_NAMESPACE) $(LIB_MAIN) > $@

##
# Builds node modules
#
node_modules: package.json
	npm install

##
# Builds documentation
#
esdoc: node_modules esdoc.json $(SRC)
	./scripts/esdoc.sh esdoc.json

##
# Runs an example and web server

.PHONY: example/*
example/*: NODE_PATH="$(NODE_PATH):$(CWD)/example/"
example/*:
	$(BUDO) $@/index.js -p 3000 --dir $@ --dir public/assets --live -- $(BROWSERIFY_TRANSFORM) --debug

##
# Cleans all built files
#
.PHONY: clean
clean:
	rm -rf lib
	rm -rf dist

##
# Run standard against the codebase
#
.PHONY: lint
lint: node_modules
	$(STANDARD)

##
# Publish package
#
.PHONY: publish
publish: lib
	cd lib && npm publish
