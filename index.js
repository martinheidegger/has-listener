'use strict'

function createCounter (targetEvent, count, handler) {
  handler(count > 0)
  return {
    up (event) {
      if (event !== targetEvent) return
      count += 1
      if (count === 1) {
        handler(true)
      }
    },
    down (event) {
      if (event !== targetEvent) return
      count -= 1
      if (count === 0) {
        handler(false)
      }
    }
  }
}

exports.hasListener = function hasListener (target, targetEvent, handler) {
  let counter = createCounter(targetEvent, target.listenerCount(targetEvent), handler)
  target.listenerCount(targetEvent)
  target.on('newListener', counter.up)
  target.on('removeListener', counter.down)

  return function stopLookingForListener () {
    target.removeListener('newListener', counter.up)
    target.removeListener('removeListener', counter.down)
  }
}
