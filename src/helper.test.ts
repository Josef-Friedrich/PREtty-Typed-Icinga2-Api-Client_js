import { test } from 'vitest'
import * as net from 'node:net'

/**
 * @see https://github.com/sindresorhus/is-port-reachable/blob/main/index.js
 */
export async function isTcpPortReachable(
  host: string,
  port: number,
  timeout: number = 500
): Promise<boolean> {
  const promise = new Promise((resolve, reject) => {
    const socket = new net.Socket()

    function onError(): void {
      socket.destroy()
      reject(new Error(`Port ${port} on host ${host} is closed!`))
    }

    socket.setTimeout(timeout)
    socket.once('error', onError)
    socket.once('timeout', onError)

    socket.connect(port, host, () => {
      socket.end()
      resolve(undefined)
    })
  })

  try {
    await promise
    return true
  } catch {
    return false
  }
}

export function debug(result: any) {
  console.log(JSON.stringify(result, null, 2))
}

export function getFirstResult(result: any) {
  return result.results[0]
}

export function debugFirst(result: any) {
  debug(getFirstResult(result))
}

test('Dummy', () => {})
