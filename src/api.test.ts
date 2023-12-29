import { test, expect } from 'vitest'

import { getObjects } from './api.js'

import { getClient } from './client.js'

const client = getClient()

test('getObjects', async () => {
  const result = await getObjects(client, 'FileLogger')
  console.log(result.results)
  // expect(result.status > -1 && result.status < 4).toBeTruthy()
  // expect(result.output).toMatch('APT')
})
