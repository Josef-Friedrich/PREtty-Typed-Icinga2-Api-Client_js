import { test, expect, describe } from 'vitest'

import { getObjects } from './low-level-api.js'

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

    const apiUser = result[0]

    expect(apiUser.type).toBe('ApiUser')
    expect(apiUser.name).toBe('api')
  })

  test('Host', async () => {
    const objects = await getObjects(client, 'Host', {
      filter: 'host.display_name == "Host 1"'
    })

    const host = objects[0]

    expect(host.type).toBe('Host')
    expect(host.name).toBe('Host1')
    expect(host.attrs.display_name).toBe('Host 1')
  })

  test('Service', async () => {
    const objects = await getObjects(client, 'Service', {
      filter: 'service.name == "Service1"'
    })

    const service = objects[0]

    expect(service.type).toBe('Service')
    expect(service.name).toBe('Host1!Service1')
    expect(service.attrs.vars.description).toBe('An additional description')
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
