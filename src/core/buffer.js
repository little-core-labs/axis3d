import isTypedArray from 'is-typedarray'
import { debug } from '../utils'
import memory from 'typedarray-pool'

import {
  InvalidArgumentsError,
  MissingContextError,
  BadArgumentError,
} from '../errors'

/**
 * Buffer pools mapped by context to set
 * @type {WeakMap<Context, Set<...Float32Array>>}
 */
const bufferPools = new WeakMap()
const contextPointers = []
let bufferPoolSize = 0

/**
 * Predicate function to indicate if argument is a viable context object.
 * isViableContext(ctx: Any) -> Boolean
 */
function isViableContext(ctx) {
  return ctx && 'object' == typeof ctx && !Array.isArray(ctx)
}

/**
 * Purge context pointers from context pointer array, and
 * clear memory cache (GC).
 * purge() -> void
 */
function purge() {
  for (const ctx of contextPointers) {
    const pool = getContextBufferPool(ctx)
    if (0 == pool.size) {
      debug("buffer: Dropping context pointer in memory buffer pool")
      deleteContextBufferPool(ctx)
    }
  }
  if (0 == bufferPoolSize) {
    debug("buffer: Purging memory pool (gc)")
    memory.clearCache()
  }
}

/**
 * Creates a context buffer pool, if it does not exist, and then
 * returns it.
 * createContextBufferPool(ctx) -> Set<...Float32Array>
 */
function createContextBufferPool(ctx) {
  if (false == hasContextBufferPool(ctx)) {
    void bufferPoolSize++
    debug("buffer: Creating new context buffer pool (%d)", bufferPoolSize)
    bufferPools.set(ctx, new Set())
    contextPointers.push(ctx)
  }
  return getContextBufferPool(ctx)
}

/**
 * Returns a Set representing a pool of allocated buffers
 * getContextBufferPool(ctx: Context) -> Set<...Float32Array>
 */
function getContextBufferPool(ctx) {
  return bufferPools.get(ctx)
}

/**
 * Deletes a buffer pool for a context.
 * deleteContextBufferPool(ctx: Context) -> void
 */
function deleteContextBufferPool(ctx) {
  if (hasContextBufferPool(ctx)) {
    void bufferPoolSize--
    bufferPools.delete(ctx)
    contextPointers.splice(contextPointers.indexOf(ctx), 1)
    purge()
  }
}

/**
 * Predicate function to indicate if the context has a buffer pool.
 * hasContextBufferPool(ctx: Context) -> Boolean
 */
function hasContextBufferPool(ctx) {
  return bufferPools.has(ctx)
}

/**
 * Free a buffer in a context pool, if the context owns it.
 * freeBufferInContext(ctx: Context, buffer: Float32Array) -> void
 */
function freeBufferInContext(ctx, buffer) {
  if (hasContextBufferPool(ctx)) {
    const pool = getContextBufferPool(ctx)
    if (pool.has(buffer)) {
      debug("buffer: Freeing buffer for context #%d", contextPointers.indexOf(ctx))
      freeBuffer(buffer)
      pool.delete(buffer)
    }
  }
  purge()
}

/**
 * Frees all buffer in a context pool.
 * freeBuffersInContext(ctx: Context) -> void
 */
function freeBuffersInContext(ctx) {
  if (hasContextBufferPool(ctx)) {
    const pool = getContextBufferPool(ctx)
    for (const buffer of pool) {
      freeBuffer(buffer)
    }
    deleteContextBufferPool(ctx)
  }
}

/**
 * Free a buffer from the global memory pool.
 * freeBuffer(buffer: Float32Array) -> void
 */
function freeBuffer(buffer) {
  if (buffer instanceof Float32Array) {
    memory.freeFloat(buffer)
  }
  purge()
}

/**
 * Allocates a buffer with fixed size in a context.
 *
 * alloc(ctx: Context, size: Number) -> Float32Array
 *
 * @public
 * @function
 * @param {Context} ctx Context for this buffer to be
 * @param {Number} size
 * @return {Float32Array}
 * @throws BadArgumentError
 * @throws MissingContextError
 * @throws InvalidArgumentsError
 */
export function alloc(ctx, size) {
  if (0 == arguments.length || arguments.length > 2) {
    throw new InvalidArgumentsError(arguments.length, 2)
  } else if (!isViableContext(ctx)) {
    throw new MissingContextError('alloc()')
  } else if ('number' != typeof size) {
    throw new BadArgumentError(1, 'size', size, 'number')
  } else if (size != size) {
    throw new BadArgumentError(1, 'size', size, 'number')
  }
  const pool = createContextBufferPool(ctx)
  const buffer = memory.mallocFloat(size)
  pool.add(buffer)
  // remove from pool and free from pool once context has been destroyed
  ctx.once('beforedestroy', () => {
    freeBufferInContext(ctx, buffer)
  })
  return buffer
}

/**
 * Frees a buffer in context, an arbitrarily allocated buffer,
 * or all buffers in a context.
 *
 * free(ctx: Context, buffer: Float32Array) -> void
 * free(buffer: Float32Array) -> void
 * free(ctx: Context) -> void
 *
 * @public
 * @param {Context|Float32Array} ctx
 * @param {?(Float32Array)} buffer
 * @return {undefined}
 * @throws BadArgumentError
 * @throws MissingContextError
 * @throws InvalidArgumentsError
 */
export function free(ctx, buffer) {
  if (2 == arguments.length) {
    if (!isViableContext(ctx)) {
      throw new MissingContextError('free()')
    } else if (!isTypedArray(buffer)) {
      throw new BadArgumentError(1, 'buffer', buffer, 'Float32Array')
    } else {
      return freeBufferInContext(ctx, buffer)
    }
  } else if (1 == arguments.length) {
    if (isTypedArray(ctx)) {
      return freeBuffer(ctx)
    } else if (!isViableContext(ctx)) {
      throw new MissingContextError('free()')
    } else {
      return freeBuffersInContext(ctx)
    }
  } else if (0 == arguments.length) {
    throw new MissingContextError('free()')
  } else {
    throw new InvalidArgumentsError(arguments.length, 2)
  }
}

/**
 * Returns a count of all buffers in a context, or for
 * all contexts. If a ccontext is provided and it does not have
 * a pool allocated, then this function will return 0.
 *
 * count([ctx: Context = undefined]) -> Number
 *
 * @public
 * @function
 * @param {?(Context)} [ctx = undefined]
 * @return {Number}
 * @throws BadArgumentError
 * @throws InvalidArgumentsError
 */
export function count(ctx = undefined) {
  if (arguments.length > 1) {
    throw new InvalidArgumentsError(arguments.length, 1)
  } else if (undefined !== ctx) {
    if (!isViableContext(ctx)) {
      throw new BadArgumentError(0, 'ctx', ctx, 'Context')
    } else if (hasContextBufferPool(ctx)) {
      return getContextBufferPool(ctx).size
    } else {
      return 0
    }
  } else {
    return contextPointers
      .map((ctx) => getContextBufferPool(ctx))
      .reduce((total, {size}) => total + size, 0)
  }
}
