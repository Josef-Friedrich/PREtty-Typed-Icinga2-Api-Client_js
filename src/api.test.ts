import { test, expect, describe } from 'vitest'

import { getObjects } from './api.js'

import { getClient } from './client.js'

const client = getClient()

function debug(result: any) {
  console.log(JSON.stringify(result, null, 2))
}

function getFirstResult(result: any) {
  return result.results[0]
}

function debugFirst(result: any) {
  debug(getFirstResult(result))
}

describe('getObjects', () => {
  test('ApiUser', async () => {
    const result = await getObjects(client, 'ApiUser')
  })

  test('Service', async () => {
    const result = await getObjects(client, 'Service')
    debugFirst(result)

  })

  test('User', async () => {
    const result = await getObjects(client, 'User')
  })
})
