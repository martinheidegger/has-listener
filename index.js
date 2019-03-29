'use strict'

exports.hasListener = function hasListener (target, targetEvent, handler) {
  let count = target.listenerCount(targetEvent)
  target.on('newListener', newListener)
  target.on('removeListener', removeListener)

  handler(count > 0)

  return function stopLookingForListener () {
    target.removeListener('newListener', newListener)
    target.removeListener('removeListener', removeListener)
  }

  function newListener (event) {
    if (event !== targetEvent) {
      return
    }
    count += 1
    if (count === 1) {
      handler(true)
    }
  }

  function removeListener (event) {
    if (event !== targetEvent) {
      return
    }
    count -= 1
    if (count === 0) {
      handler(false)
    }
  }
}
