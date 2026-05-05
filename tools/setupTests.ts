import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'
import {TextEncoder, TextDecoder} from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
window.getOpenmrsSpaBase = jest.fn().mockReturnValue('/lab')
Object.defineProperty(global, 'crypto', {
  value: {
    ...(global.crypto ?? {}),
    randomUUID: jest.fn().mockReturnValue('test-uuid'),
  },
  writable: true,
  configurable: true,
})
