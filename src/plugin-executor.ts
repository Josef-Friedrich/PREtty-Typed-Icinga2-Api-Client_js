import { spawn, spawnSync } from 'node:child_process'

import type { State } from './object-types.js'

interface CheckResult {
  status: State
  output: string
}

function isState(state?: any) {
  return (
    typeof state === 'number' &&
    (state === 0 || state === 1 || state === 2 || state === 3)
  )
}

function validateState(state?: any): State {
  if (isState(state)) {
    return state
  }
  throw new Error(`Unknown state ${state}`)
}

export function invokePluginSync(
  command: string,
  args: string[] = []
): CheckResult {
  const result = spawnSync(command, args, { encoding: 'utf-8' })
  return {
    status: validateState(result.status),
    output: result.stdout
  }
}

export function invokePlugin(
  command: string,
  args: string[] = []
): Promise<CheckResult> {
  return new Promise((resolve, reject) => {
    const plugin = spawn(command, args)

    let output: string
    plugin.stdout.on('data', (data) => {
      output = data.toString()
    })

    let error: string
    plugin.stderr.on('data', (data) => {
      error = data.toString()
    })

    plugin.on('close', (code) => {
      if (isState(code)) {
        resolve({ status: validateState(code), output })
      } else {
        reject({ code, error })
      }
    })
  })
}
