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
  })

  test('User', async () => {
    const objetcs = await getObjects(client, 'User', {
      filter: 'user.name == "user2"',
      attrs: ['display_name']
    })

    const user = objetcs[0]

    expect(user.type).toBe('User')
    expect(user.name).toBe('user2')
    expect(user.attrs.display_name).toBe('User 2')
  })
})
