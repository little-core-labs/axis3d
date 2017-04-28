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
export BROWSERIFY := $(BIN)/browserify

##
# Path to `babel`
#
export BABEL := $(BIN)/babel

##
# Path to `budo`
#
export BUDO := $(BIN)/budo

##
# Path to `standard`
#
export STANDARD := $(BIN)/standard

##
# Path to devtool
#
export DEVTOOL := $(BIN)/devtool

##
# Path to esdoc
#
export ESDOC := $(BIN)/esdoc

##
# Path to derequire
#
export DEREQUIRE = $(BIN)/derequire

##
# Module source (js)
#
SRC += $(wildcard src/*/*/*/*.js)
SRC += $(wildcard src/*/*/*.js)
SRC += $(wildcard src/*/*.js)
SRC += $(wildcard src/*.js)

##
# Module source (glsl)
#
SRC += $(wildcard src/glsl/*/*/*/*.glsl)
SRC += $(wildcard src/glsl/*/*/*.glsl)
SRC += $(wildcard src/glsl/*/*.glsl)
SRC += $(wildcard src/glsl/*.glsl)

##
# Test sources
#
TESTS += $(wildcard test/*/*/*/*)
TESTS += $(wildcard test/*/*/*)
TESTS += $(wildcard test/*/*)
TESTS += $(wildcard test/*)

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
GLOBAL_NAMESPACE = Axis3D

##
# Babel ENV
#
BABEL_ENV ?= commonjs

##
# Browserify transform
#
BROWSERIFY_TRANSFORM := -g babelify
BROWSERIFY_TRANSFORM_DIST := -g rollupify \
														 -g babelify  \
														 -g uglifyify \
														 -s $(GLOBAL_NAMESPACE)

##
# Devtool flags
#
DEVTOOL_FLAGS := -hqc -t 1000 -r babel-register

##
# Use yarn if available
#
YARN_OR_NPM := $(shell which yarn npm | head -1)

ifeq ($(YARN_OR_NPM),)
$(error Missing package manager. Please install yarn or npm)
endif

##
# Ensures parent directory is built
#
define BUILD_PARENT_DIRECTORY
	mkdir -p $(dir $@)
endef

##
# Test runner command
define RUN_TEST
	@$(BROWSERIFY) $(1) $(BROWSERIFY_TRANSFORM) \
		| $(DEVTOOL) $(DEVTOOL_FLAGS) $(1)
endef

##
# Builds everything
#
all: lib build dist

##
# Builds all files
#
lib: $(SRC) | node_modules README.md
	rm -rf lib
	BABEL_ENV=$(BABEL_ENV) $(BABEL) $(CWD)/src --out-dir $@ --source-maps inline
	cp package.json $@
	cp README.md $@

##
# Builds all build files
#
build: build/axis.js

##
# Builds javascript build file
#
build/axis.js: BABEL_ENV=development
build/axis.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	NODE_ENV=$(BABEL_ENV) $(BROWSERIFY) $(BROWSERIFY_TRANSFORM) -d $(LIB_MAIN) > $@

##
# Builds all dist files
#
dist: dist/axis.min.js

##
# Builds javascript dist file
#
dist/axis.min.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_TRANSFORM_DIST) $(LIB_MAIN) | $(DEREQUIRE) > $@

##
# Builds node modules
#
node_modules: package.json
	$(YARN_OR_NPM) install

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
	$(BUDO) $@/index.js -p 3000 --dir $@ --dir public --live --verbose -- $(BROWSERIFY_TRANSFORM) --debug

##
# Cleans all built files
#
.PHONY: clean
clean:
	rm -rf lib
	rm -rf dist
	rm -rf build

##
# Run standard against the codebase
#
.PHONY: lint
lint: node_modules
	$(STANDARD)

##
# Link lib globally
#
.PHONY: link
link: lib
	cd lib && $(YARN_OR_NPM) link

##
# Run all tests
#
.PHONY: test
test: node_modules
	$(call RUN_TEST, $@)

##
# Run a module tests
#
.PHONY: $(TESTS)
$(TESTS):
	$(call RUN_TEST, $@)
