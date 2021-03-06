'use strict'
const test = require('tap').test
const EventEmitter = require('events').EventEmitter
const hasListener = require('.').hasListener

test('Basic functionality', t => {
  const emitter = new EventEmitter()
  let active = null
  let count = 0
  const stop = hasListener(emitter, 'test', isActive => {
    active = isActive
    count += 1
  })
  t.equals(active, false, 'immediately called initially')
  emitter.addListener('other', () => {})
  t.equals(active, false, 'other event didnt effect the listening')
  t.equals(count, 1, 'other events dont retrigger')
  emitter.addListener('test', () => {})
  t.equals(active, true, 'adding an event triggers the handler')
  emitter.addListener('test', () => {})
  t.equals(active, true, 'multiple listeners: the trigger stays active')
  t.equals(count, 2, 'adding another listener does not trigger the handler')
  emitter.removeAllListeners('test')
  t.equals(active, false, 'removing all listeners resets the count')
  emitter.addListener('test', () => {})
  t.equals(active, true, 'adding the listener again is supposed to trigger the handler')
  stop()
  emitter.removeAllListeners()
  t.equals(active, true, 'because it is stopped, the value stays active')
  t.equals(count, 4, 'after stopping the trigger shouldnt be called')
  t.end()
})

test('multiple events', t => {
  const emitter = new EventEmitter()
  let active = null
  hasListener(emitter, ['a', 'b'], isActive => {
    active = isActive
  })
  t.equals(active, false, 'no listener yet!')
  emitter.on('a', () => {})
  t.equals(active, true, 'one listener is enough')
  emitter.removeAllListeners('a')
  t.equals(active, false, 'but one is needed!')
  emitter.on('b', () => {})
  t.equals(active, true, 'the other listener also works')
  emitter.on('a', () => {})
  t.equals(active, true, 'two listeners work as well')
  t.removeAllListeners('b')
  t.equals(active, true, 'back to one, still okay!')
  t.end()
})
