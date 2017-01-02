'use strict'

export const stats = {}

export function createStatList(name) {
  if (null == stats[name]) {
    stats[name] = []
  }
  return stats[name]
}

export function registerStat(name, info) {
  createStatList(name)
  const stat = new Stat(name, info)
  stats[name].push(stat)
  return stat
}

export function incrementStat(name) {
  createStatList(name)
  const tail = tailStat(name)
  let value = 1
  if (tail) {
    value = tail.info + 1
  }
  registerStat(name, value)
  return value
}

export function decrementStat(name) {
  createStatList(name)
  const tail = tailStat(name)
  let value = 0
  if (tail) {
    value = tail.info - 1
  }
  registerStat(name, value)
  return value
}

export function resetStat(name) {
  stats[name] = []
}

export function headStat(name) {
  if (stats[name]) {
    return stats[name][0] || null
  }
  return null
}

export function tailStat(name) {
  if (stats[name]) {
    const len = stats[name].length || 0
    return stats[name][len - 1] || null
  }
  return null
}

export class Stat {
  constructor(name, info) {
    this.name = name
    this.info = info
    this.timestamp = Date.now()
  }
}
