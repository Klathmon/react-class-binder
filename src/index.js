import { Component } from 'react'

const methodsToIgnore = [
  'constructor',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'render'
]

export default (Super) => class extends Super {
  constructor (...args) {
    super(...args)
    let prototype = this
    // keep walking back the prototype chain until we find the "important" one
    // The "important" one is the one right before this one, which is 2 before React's `Component`
    while (true) {
      prototype = Object.getPrototypeOf(prototype)
      const parentPrototype = Object.getPrototypeOf(prototype)
      const grandparentPrototype = Object.getPrototypeOf(parentPrototype)
      if (parentPrototype instanceof Component && !(grandparentPrototype instanceof Component)) {
        // At this point the prototype we want to work with is in the variable `prototype`
        // So let's get it's properties, and set them all to bind on this!
        for (let methodName of Object.getOwnPropertyNames(prototype)) {
          // Don't bother binding any methods that don't need it...
          if (!!~methodsToIgnore.indexOf(methodName)) continue // eslint-disable-line no-extra-boolean-cast

          this[methodName] = prototype[methodName].bind(this)
        }
        break
      }
    }
  }
}
