import { test, expect } from 'vitest'

import { invokePlugin } from './plugin-executor.js'

test('invokePlugin', async () => {
  const result = await invokePlugin('check_apt')
  expect(result.status > -1 && result.status < 4).toBeTruthy()
  expect(result.output).toMatch('APT')
})
