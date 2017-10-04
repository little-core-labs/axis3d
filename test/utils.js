'use strict'

import { Context } from '../lib/core/context'

export const sharedContext = new Context()
export const xtest = (name, test) => {
  console.warn('\tskipping test %s', name)
}
