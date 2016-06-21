import { Component } from 'react'
import binder from './index'

export * from 'react'

export class AutobindComponent extends binder(Component) {}
