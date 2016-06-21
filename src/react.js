import React from 'react'
import binder from './index'

React.AutobindComponent = class AutobindComponent extends binder(React.Component, 4) {}

export default React
