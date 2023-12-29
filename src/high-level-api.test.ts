import { test, expect, describe } from 'vitest'

import { sendServiceCheckResult } from './high-level-api.js'

describe('high-level-api.ts', () => {
  test('sendServiceCheckResult', async () => {
    const results = await sendServiceCheckResult(
      'Host1',
      'Service1',
      1,
      'This is a test'
    )
    expect(results[0].code).toBe(200)
    expect(results[0].status).toBe(
      "Successfully processed check result for object 'Host1!Service1'."
    )
  })
})
