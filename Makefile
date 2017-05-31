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
# Path to colortape
#
export COLORTAPE = $(BIN)/colortape

##
# Path to uglifyjs
#
export UGLIFYJS = $(BIN)/uglifyjs

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
# Project name and global namespace target
#
PROJECT_NAME = axis3d

##
# Babel ENV
#
BABEL_ENV ?= commonjs

##
# Browserify configuration flags
# for source transpile
#
BROWSERIFY_FLAGS += -t babelify

##
# Browserify configuration flags
# for distribition build
#
BROWSERIFY_FLAGS_DIST += -t rollupify
BROWSERIFY_FLAGS_DIST += -t babelify
BROWSERIFY_FLAGS_DIST += -s $(PROJECT_NAME)

##
# Browserify configuration flags
# for minified distribition build
#
BROWSERIFY_FLAGS_DIST_MIN += -t rollupify
BROWSERIFY_FLAGS_DIST_MIN += -t babelify
BROWSERIFY_FLAGS_DIST_MIN += -g uglifyify
BROWSERIFY_FLAGS_DIST_MIN += -s $(PROJECT_NAME)

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
  @$(BROWSERIFY) $(1) $(BROWSERIFY_FLAGS) \
    | $(DEVTOOL) $(DEVTOOL_FLAGS) $(1)    \
    | $(COLORTAPE)
endef

##
# Builds everything
#
all: lib dist

##
# Builds all files
#
lib: $(SRC) | node_modules README.md
	rm -rf lib
	BABEL_ENV=$(BABEL_ENV) $(BABEL) $(CWD)/src --out-dir $@ --source-maps inline
	cp package.json $@
	cp README.md $@

##
# Builds all dist files
#
dist: dist/$(PROJECT_NAME).js dist/$(PROJECT_NAME).min.js

##
# Builds javascript dist file
#
dist/$(PROJECT_NAME).js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_FLAGS_DIST) $(LIB_MAIN) \
    | $(DEREQUIRE) > $@

##
# Builds minified javascript dist file
#
dist/$(PROJECT_NAME).min.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_FLAGS_DIST_MIN) $(LIB_MAIN) \
    | $(DEREQUIRE) \
    | $(UGLIFYJS) -c -m > $@

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
	$(BUDO) $@/index.js -p 3000 --dir $@ --dir public --live --verbose -- $(BROWSERIFY_FLAGS) --debug

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
