import { test, expect, describe } from 'vitest'

import { queryObjects, createObject, deleteObject } from './low-level-api.js'

import { getClient } from './client.js'
import { debug } from './helper.test.js'

const client = getClient()

describe('low-level-api.ts', () => {
  describe('function queryObjects()', () => {
    describe('joins', () => {
      test('with object type name: host', async () => {
        const objects = await queryObjects(client, 'Service', {
          joins: ['host'],
          filter: 'service.name == "Service1"'
        })

        expect(objects[0].joins.host.__name).toBe('Host1')
      })

      test('with attribute: host.name', async () => {
        const objects = await queryObjects(client, 'Service', {
          joins: ['host.name'],
          filter: 'service.name == "Service1"'
        })

        expect(objects[0].joins.host.name).toBe('Host1')
      })

      test('with attribute: check_command.name', async () => {
        const objects = await queryObjects(client, 'Service', {
          joins: ['check_command.name']
        })

        for (const service of objects) {
          expect(service.joins.check_command.name).toBeTypeOf('string')
        }
      })

      test('unknown object type', async () => {
        const objects = await queryObjects(client, 'Service', {
          joins: ['xxx'],
          filter: 'service.name == "Service1"'
        })

        expect(objects[0].joins).toEqual({})
      })
    })

    test('ApiUser', async () => {
      const result = await queryObjects(client, 'ApiUser')

      const apiUser = result[0]

      expect(apiUser.type).toBe('ApiUser')
      expect(apiUser.name).toBe('api')
    })

    test('Host', async () => {
      const objects = await queryObjects(client, 'Host', {
        filter: 'host.display_name == "Host 1"'
      })

      const host = objects[0]

      expect(host.type).toBe('Host')
      expect(host.name).toBe('Host1')
      expect(host.attrs.display_name).toBe('Host 1')
    })

    test('Service', async () => {
      const objects = await queryObjects(client, 'Service', {
        filter: 'service.name == "Service1"'
      })

      const service = objects[0]

      expect(service.type).toBe('Service')
      expect(service.name).toBe('Host1!Service1')
      expect(service.attrs.vars.description).toBe('An additional description')
    })

    test('User', async () => {
      const objetcs = await queryObjects(client, 'User', {
        filter: 'user.name == "user2"',
        attrs: ['display_name']
      })

      const user = objetcs[0]

      expect(user.type).toBe('User')
      expect(user.name).toBe('user2')
      expect(user.attrs.display_name).toBe('User 2')
    })
  })

  describe('Function createObject', () => {
    test('host', async () => {
      async function deleteHost() {
        return await deleteObject(client, 'Host', 'test-host', {
          cascade: true
        })
      }

      // Maybe the host already exists
      await deleteHost()

      const createResult = await createObject(client, 'Host', 'test-host', {
        templates: ['generic-host'],
        attrs: {
          display_name: 'Test Host',
          address: '1.2.3.4'
        }
      })

      expect(createResult.code).toBe(200)
      expect(createResult.status).toBe('Object was created')

      const hosts = (await queryObjects(client, 'Host', {
        filter: 'host.name == "test-host"'
      })) as any

      expect(hosts[0].attrs.display_name).toBe('Test Host')

      const deleteResult = await deleteHost()

      expect(deleteResult.code).toBe(200)
      expect(deleteResult.name).toBe('test-host')
      expect(deleteResult.status).toBe('Object was deleted.')
    })
  })
})
