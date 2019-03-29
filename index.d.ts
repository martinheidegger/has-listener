import { EventEmitter } from 'events'

type StopListening = () => void

declare function hasListener (target: EventEmitter, event: string, handler: (hasHandler: boolean) => void): StopListening
