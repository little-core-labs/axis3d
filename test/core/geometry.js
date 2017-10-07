import { Geometry } from '../../lib/core'
import assert from 'assert'
import bunny from 'bunny'
import test from 'tape'

test("new Geometry(opts: Object = {}) -> Geometry",
  ({ok, throws, end}) => {
    ok('function' == typeof Geometry,
      "Geometry is constructor.")

    throws(() => { Geometry() }, Error,
      "Must be called with 'new' operator.")

    ok(new Geometry(),
      "Can be called without arguments.")

    ok(new Geometry({}),
      "First argument can be a Object.")

    throws(() => { new Geometry(1) }, Error,
      "First argument cannot be a Number.")

    throws(() => { new Geometry([]) }, Error,
      "First argument cannot be an Array.")

    throws(() => { new Geometry(() => void 0) }, Error,
      "First argument cannot be a Function.")

    ok(new Geometry(bunny),
      "First argument can be a complex.")

    ok(new Geometry({complex: bunny}),
      "First argument can be an object containing a complex.")

    ok(new Geometry({complex: new Geometry(bunny)}),
      "First argument can be a geometry instance.")

    end()
  })


test("geometry.complex -> Object",
  ({ok, end}) => {
    const {complex} = new Geometry(bunny)
    ok(complex && 'object' == typeof complex, "Is an object.")
    ok(complex != bunny, "Is unique to instance.")
    end()
  })


test("geometry.complex = complex",
  ({ok, end}) => {
    const geometry = new Geometry()
    geometry.complex = bunny
    const {complex} = geometry
    ok(complex && 'object' == typeof complex, "Is an object.")
    ok(complex != bunny, "Is unique to instance.")
    end()
  })


test("geometry.positions -> Array|null",
  ({ok, end}) => {
    const geometry = new Geometry()
    ok(null === geometry.positions, "Is null without complex")
    geometry.complex = bunny
    ok(Array.isArray(geometry.positions) && geometry.positions.length,
      "Is an array after complex is set.")
    end()
  })


test("geometry.normals -> Array|null",
  ({ok, end}) => {
    const geometry = new Geometry()
    ok(null === geometry.normals, "Is null without complex")
    geometry.complex = bunny
    ok(Array.isArray(geometry.normals) && geometry.normals.length,
      "Is an array after complex is set.")
    end()
  })


test("geometry.[faces|cells] -> Array|null",
  ({ok, end}) => {
    do {
      const geometry = new Geometry()
      ok(null === geometry.faces, "Is null without complex")
      geometry.complex = bunny
      ok(Array.isArray(geometry.faces) && geometry.faces.length,
        "Is an array after complex is set.")
    } while(0);

    do {
      const geometry = new Geometry()
      ok(null === geometry.cells, "Is null without complex")
      geometry.complex = bunny
      ok(Array.isArray(geometry.cells) && geometry.cells.length,
        "Is an array after complex is set.")
    } while (0);

    end()
  })


test("geometry.uvs -> Array|null",
  ({ok, end}) => {
    const geometry = new Geometry()
    ok(null === geometry.uvs, "Is null without complex")
    geometry.complex = bunny
    ok(Array.isArray(geometry.uvs) && geometry.uvs.length,
      "Is an array after complex is set.")
    end()
  })


test("geometry.computeBoundingBox() -> Array|null",
  ({ok, end}) => {
    const geometry = new Geometry()
    ok(null === geometry.uvs, "Is null without complex")
    geometry.complex = bunny
    const aabb = geometry.computeBoundingBox()
    ok(Array.isArray(aabb) && aabb.length,
      "Is an array after complex is set.")
    end()
  })
