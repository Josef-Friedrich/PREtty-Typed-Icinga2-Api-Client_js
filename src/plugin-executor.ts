import { spawn } from 'node:child_process'

import { Status } from './api.js'

interface CheckResult {
  status: Status
  output: string
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
      let status: Status = 3
      if (
        code != null &&
        (code === 0 || code === 1 || code === 2 || code === 3)
      ) {
        status = code
        resolve({ status, output })
      } else {
        reject({ code, error })
      }
    })
  })
}
