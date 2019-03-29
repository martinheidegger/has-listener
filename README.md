# has-listener

<a href="https://travis-ci.org/martinheidegger/has-listener"><img src="https://travis-ci.org/martinheidegger/has-listener.svg?branch=master" alt="Build Status"/></a>
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/fe7f58777d60b93f2e42/maintainability)](https://codeclimate.com/github/martinheidegger/has-listener/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fe7f58777d60b93f2e42/test_coverage)](https://codeclimate.com/github/martinheidegger/has-listener/test_coverage)

`has-listener` is a little util, useful in combination with [`EventEmitter`][events].
It allows to do some operation only if an event listener is added to an emitter.

[events]: https://nodejs.org/api/events.html#events_class_eventemitter

`npm i has-listener --save`

### Why

Let's embrace the [Observer Effect][observer-effect]! 👀 With this little tool you can 
let your classes do different things depending on whether there is an observer or not.

[observer-effect]: https://en.wikipedia.org/wiki/Observer_effect_(physics)

### Usage

```js
const { hasListener } = require('has-listener')
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
```

### License

[MIT](./LICENSE)
