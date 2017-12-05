CWD := $(shell pwd)
BIN := node_modules/.bin

export BABEL := $(BIN)/babel
export BROWSERIFY := $(BIN)/browserify
export BUDO := $(BIN)/budo
export COLORTAPE = $(BIN)/colortape
export DEREQUIRE = $(BIN)/derequire
export DEVTOOL := $(BIN)/devtool
export ESDOC := $(BIN)/esdoc
export STANDARD := $(BIN)/standard
export UGLIFYJS = $(BIN)/uglifyjs

SRC += $(wildcard src/*/*/*/*.js)
SRC += $(wildcard src/*/*/*.js)
SRC += $(wildcard src/*/*.js)
SRC += $(wildcard src/*.js)

SRC += $(wildcard src/core/glsl/*/*/*/*.glsl)
SRC += $(wildcard src/core/glsl/*/*/*.glsl)
SRC += $(wildcard src/core/glsl/*/*.glsl)
SRC += $(wildcard src/core/glsl/*.glsl)

TESTS += $(wildcard test/*/*/*/*)
TESTS += $(wildcard test/*/*/*)
TESTS += $(wildcard test/*/*)
TESTS += $(wildcard test/*)

SRC_MAIN = src/index.js
LIB_MAIN = lib/index.js

PROJECT_NAME = axis3d
BABEL_ENV ?= commonjs

DEVTOOL_FLAGS += -hqc -r babel-register

YARN_OR_NPM := $(shell which yarn npm | head -1)

BROWSERIFY_FLAGS += -t babelify

BROWSERIFY_FLAGS_DIST += -t rollupify
BROWSERIFY_FLAGS_DIST += -g babelify
BROWSERIFY_FLAGS_DIST += -s $(PROJECT_NAME)

BROWSERIFY_FLAGS_DIST_MIN += -g rollupify
BROWSERIFY_FLAGS_DIST_MIN += -g babelify
BROWSERIFY_FLAGS_DIST_MIN += -t uglifyify
BROWSERIFY_FLAGS_DIST_MIN += -s $(PROJECT_NAME)

ifeq ($(YARN_OR_NPM),)
$(error Missing package manager. Please install yarn or npm)
endif

define BUILD_PARENT_DIRECTORY
	mkdir -p $(dir $@)
endef

define RUN_TEST
	$(DEVTOOL) $(DEVTOOL_FLAGS) $(2) $(1) \
	| $(COLORTAPE)
endef

all: lib dist
lib: $(SRC) | node_modules README.md
	rm -rf lib
	BABEL_ENV=$(BABEL_ENV) $(BABEL) $(BABEL_FLAGS) $(CWD)/src --out-dir $@ --source-maps inline
	cp package.json $@
	cp README.md $@

dist: dist/$(PROJECT_NAME).js dist/$(PROJECT_NAME).min.js

dist/$(PROJECT_NAME).js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_FLAGS_DIST) $(LIB_MAIN) \
    | $(DEREQUIRE) > $@

dist/$(PROJECT_NAME).min.js: node_modules lib
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) $(BROWSERIFY_FLAGS_DIST_MIN) $(LIB_MAIN) \
    | $(DEREQUIRE) \
    | $(UGLIFYJS) -c -m > $@

node_modules: package.json
	$(YARN_OR_NPM) install

esdoc: node_modules esdoc.json $(SRC)
	./scripts/esdoc.sh esdoc.json

.PHONY: example/*
example/*: NODE_PATH="$(NODE_PATH):$(CWD)/example/"
example/*:
	$(BUDO) $@/index.js -p 3000 --dir $@ --dir public --live --verbose $(BUDO_FLAGS) -- $(BROWSERIFY_FLAGS) --debug

.PHONY: clean
clean:
	rm -rf lib
	rm -rf dist

.PHONY: lint
lint: node_modules
	$(STANDARD)

.PHONY: link
link: lib
	cd lib && $(YARN_OR_NPM) link

.PHONY: test
test: node_modules
	$(call RUN_TEST, $@)

.PHONY: $(TESTS)
$(TESTS):
	$(call RUN_TEST, $@, -t 5000)
