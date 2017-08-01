import { ContextComponent } from './context'
import { Component } from '../component'

export class DefinesComponent extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    super(ctx, initialState,
      new ContextComponent(ctx, initialState, {
        defines(...args) {
          const defines = {}
          for (const prop in props) {
            const value = props[prop]
            if ('function' == typeof value) {
              defines[prop] = value(...args)
            } else {
              defines[prop] = value
            }

            if (null == defines[prop]) { delete defines[prop] }
          }
          return defines
        }
      })
    )
  }
}
