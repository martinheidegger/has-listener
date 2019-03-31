import { EventEmitter } from 'events'

type StopListening = () => void

declare function hasListener (target: EventEmitter, event: string | string[] | Set<string>, handler: (hasHandler: boolean) => void): StopListening
