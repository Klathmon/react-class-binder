import React from 'react'
import binder from './index'

React.BinderComponent = class BinderComponent extends binder(React.Component, 4) {}

export default React
