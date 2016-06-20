# React Class Binder

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Automatically bind methods defined in a React component using the ES2015 class syntax (similar to how React.createClass works).

This is a small package that uses a "trick" that allows mixin behavior in ES2015 using "subclass factories" so that you don't need to manually call the function in the `constructor()` function, and you don't need to resort to still unstandardized syntax like decorators or ES2015 class properties. You can read more about it [here](http://www.2ality.com/2016/05/six-nifty-es6-tricks.html#simple-mixins-via-subclass-factories).

## Installation

To install the stable version:

```shell
npm install --save react-class-binder
```

## Usage
This package uses a cool trick with ES2015 classes to make it extremely easy to use:

```js
import React from 'react'
import binder from 'react-class-binder'

export default class ComponentName extends binder(React.Component) {
  // ...component stuff here
}

```

No other configuration or options are needed! `react-class-binder` will only bind what is absolutely necessary, so it won't touch React related method, nor will it rebind any method on any class that extends your class. So any libraries which use inheritance or higher-order-components will work fine with `react-class-binder` (Including [`react-css-modules`](https://github.com/gajus/react-css-modules) and [`radium`](https://github.com/FormidableLabs/radium))!

## Full Example

```js
import React from 'react'
import binder from 'react-class-binder'

//                                      V   That's all that's needed!
export default class ReverseP extends binder(React.Component) {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  }

  reverseText () {
    // `this` is magically bound to the correct context!
    return this.props.text.split('').reverse().join('')
  }

  // Since `this` is already "correctly bound" in React's functions, `react-class-binder` skips these
  componentDidMount () {
    console.log('Component Mounted!')
  }
  componentWillUnmount () {
    console.log('Component About to Unmount!')
  }

  render () {
    return <p>{this.reverseText()}</p>
  }
}

```

## FAQ

**Why?**  
I was using the `reverseText = () => {` trick for a while to allow my React functions to be "correctly bound", however it always rubbed me the wrong way. It was still unfinalized syntax, it was somewhat unintuitive to others that didn't know the trick, and it became annoying when I wanted to use async functions in a class once. So I made this package to avoid having to use that.

**Why not just use one of the other packages for this?**  
One of them required decorators, which was a no-start because I'm trying to avoid non-standard syntax. A few others I saw used functions that were called in the constructor, which was a bit more boilerplate than I would have preferred to have in each component, and they didn't play well with other libraries that inherited from your class like `react-css-modules`. This is simple, small, and works in all cases I've tried so far.

**Does this impact performance?**
`react-class-binder` does all binding when the object is instantiated (in React, this is basically the componentWillMount lifecycle method). That is the only place that will take longer when using this package, and even that is so small that I can't reliably measure it.

## Inspiration & Thanks
* Thanks to [`react-autobind`](https://github.com/cassiozen/React-autobind) and [Autobind Decorator](https://github.com/andreypopp/autobind-decorator) for the idea, and for helping me figure out the edge cases I'd need to solve.
* Thanks to Dr. Axel Rauschmayer of [②ality.com](http://www.2ality.com/) for the "mixins" idea.

## Contributing

The code is written in ES6 using [Javascript Standard Style](https://github.com/feross/standard). Feel free to make PRs adding features you want, but please try to follow Standard. Also, documentation/readme PRs are more then welcome!

## License

[MIT](LICENSE.md) Copyright (c) [Gregory Benner](https://github.com/Klathmon)
