'use strict'

function createCounter (targetEvents, count, handler) {
  handler(count > 0)
  return {
    up (event) {
      if (!targetEvents.has(event)) return
      count += 1
      if (count === 1) {
        handler(true)
      }
    },
    down (event) {
      if (!targetEvents.has(event)) return
      count -= 1
      if (count === 0) {
        handler(false)
      }
    }
  }
}

function countListeners (target, targetEvents) {
  let count = 0
  for (const targetEvent of targetEvents) {
    count += target.listenerCount(targetEvent)
  }
  return count
}

exports.hasListener = function hasListener (target, targetEvents, handler) {
  if (!(targetEvents instanceof Set)) {
    if (!Array.isArray(targetEvents)) {
      targetEvents = [targetEvents]
    }
    targetEvents = new Set(targetEvents)
  }
  let counter = createCounter(targetEvents, countListeners(target, targetEvents), handler)
  target.on('newListener', counter.up)
  target.on('removeListener', counter.down)

  return function stopLookingForListener () {
    target.removeListener('newListener', counter.up)
    target.removeListener('removeListener', counter.down)
  }
}
