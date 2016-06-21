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

/**
 * Binds the given class's methods
 * @param  {Class} Super
 * @param  {Number} numberToLookBack The number of "steps" back from Component to bind methods on
 *                                   Don't use this unless you are me! It might go away at any time!
 * @return {Class}
 */
export default function binder (Super, numberToLookBack = 3) {
  return class extends Super {
    constructor (...args) {
      super(...args)
      // keep walking back the prototype chain until we find the "important" one
      // The last element of the "prototypeChain" array is react's Constructor
      const prototypeChain = getPrototypeChain(this)
      // Get the prototype we care about by walking back a specific number from the end of the prototype chain I made
      const prototypeToBind = prototypeChain[prototypeChain.length - numberToLookBack]

      // Get all the property names for the prototype i care about
      for (let methodName of Object.getOwnPropertyNames(prototypeToBind)) {
        // Don't bother binding any methods that don't need it...
        if (!!~methodsToIgnore.indexOf(methodName)) continue // eslint-disable-line no-extra-boolean-cast
        // Ignore anything that's not a method
        if (Object.getOwnPropertyDescriptor(prototypeToBind, methodName).value !== 'function') continue

        this[methodName] = prototypeToBind[methodName].bind(this)
      }
    }
  }
}

/**
 * Returns an array of "parent" prototypes walking up the chain. It ends at React's Component prototypeChain
 * @param  {Object} start `this` from the extending class
 * @return {Array}
 */
function getPrototypeChain (start) {
  const prototypeChain = [start]
  do {
    try {
      prototypeChain.push(Object.getPrototypeOf(prototypeChain[prototypeChain.length - 1]))
    } catch (e) {
      break
    }
  } while (
    prototypeChain < 3 || // While the prototypeChain is less than 3, just loop (we need at least 3 before doing any checking)
    !( // If the following is false, keep going
      prototypeChain[prototypeChain.length - 2] instanceof Component &&  // The parent must be an instanceof Component
      !(prototypeChain[prototypeChain.length - 1] instanceof Component) // The grandparent must NOT be an instanceof Component
    )
  )
  return prototypeChain
}
