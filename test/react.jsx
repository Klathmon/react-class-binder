import React from '../src/react'
import jsdom from 'mocha-jsdom'
import { expect } from 'chai'
import { renderIntoDocument } from 'react-addons-test-utils'

class ReverseP extends React.AutobindComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  }

  reverseText () {
    // `this` is magically bound to the correct context!
    return this.props.text.split('').reverse().join('')
  }

  render () {
    return <p>{this.reverseText()}</p>
  }
}

class ExtendedReverseP extends ReverseP {
   testThis () {
     return Object.getOwnPropertyNames(this)
   }
}

describe('AutobindComponent Extended Class', () => {
  jsdom()

  it('renders without errors', () => {
    const component = renderIntoDocument(<ReverseP text='test'/>)

    expect(component.reverseText()).to.equal('tset')
  })
  it('does not break extended classes', () => {
    const component = renderIntoDocument(<ExtendedReverseP text='test'/>)

    expect(component.reverseText()).to.equal('tset')

    const extendedThis = component.testThis()
    expect(extendedThis).to.not.include('testThis')
  })
})
