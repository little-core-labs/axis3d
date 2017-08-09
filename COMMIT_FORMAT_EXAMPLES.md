Commit Message Examples
=======================

## Chores

A `chore` type is a task not directly tied to a feature, fix, or test. It is
often work that requires no change to production code.

```
chore(scripts): Moved extraneous scripts into scripts/ directory
```

## Documentation

A `docs` type is a task that directly effects documentation that is
constructed manually, programmitcally, or through a third-party. This
can include typos, additions, deletions, and examples.

```
docs(context.c): Describe new context API
```

## Features

A `feat` type is a task that introduces a new feature. The new feature
may introduce a breaking change to production code.

```
feat(texture.c): Introduce new 3D texture API
```

## Fixes/bugs

A `fix` type is a task that addresses a bug in production code, build
scripts, compilation steps, or anything that directly or indiretly breaks or
impacts production.

```
fix(buffer.c): Fix the freeing of buffer resources
```

## Refactoring

A `refactor` type is a task that changes existing code. A refactor
should be an improvement to the existing production code.

```
refactor(platform.h): Simplify macro ifdef logic for platform includes
```

## Code style

A `style` type is a task that addresses code formatting such as missing
semicolons, converting tabs to spaces, or removing extra newlines. There
should not be any code changes.

```
style(drift.h): Convert tabs to spaces
```

## Tests

A `test` type is a task that addresses the testing of production code.
This may include adding a new or missing test, refactoring existing
tests, or removing useless tests. There should not be any code changes.

```
test(gl.c): Ensure OpenGL APIs are exposed
```
