const { hasListener } = require('.')
const { EventEmitter } = require('events')

const emitter = new EventEmitter()

function onHasListener (hasListener) {
  console.log(`hasListener: ${hasListener}`)
}

const stop = hasListener(emitter, 'loop', onHasListener) // hasListener: false

emitter.on('loop', () => {}) // hasListener: true
emitter.removeAllListeners() // hasListener: false

stop() // stops updating

emitter.on('loop', () => {}) // nothing, because stop was called.
