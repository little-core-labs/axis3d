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
# Module source (js)
#
SRC += $(wildcard src/*/*/*.js)
SRC += $(wildcard src/*/*.js)
SRC += $(wildcard src/*.js)

##
# Module source (glsl)
#
SRC += $(wildcard src/glsl/*/*/*.glsl)
SRC += $(wildcard src/glsl/*/*.glsl)
SRC += $(wildcard src/glsl/*.glsl)

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
BROWSERIFY_TRANSFORM := -g babelify

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
	NODE_ENV=$(BABEL_ENV) $(BROWSERIFY) $(BROWSERIFY_TRANSFORM) --standalone $(GLOBAL_NAMESPACE) $(LIB_MAIN) > $@

##
# Builds all dist files
#
dist: dist/axis.min.js

##
# Builds javascript dist file
#
dist/axis.min.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_TRANSFORM) -g rollupify -g uglifyify --standalone $(GLOBAL_NAMESPACE) $(LIB_MAIN) > $@

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
# Publish package
#
#.PHONY: publish
#publish: lib
	#cd lib && npm publish

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
	@# @TODO(werle) make DEVTOOL_FLAGS
	@$(BROWSERIFY) test $(BROWSERIFY_TRANSFORM) | \
		$(DEVTOOL) -hqc -t 1000 -r babel-register $@
