import { getClient } from './client.js'
import * as api from './low-level-api.js'

import type { ProcessCheckResult } from './low-level-api.js'

const client = getClient()

/**
 * A simplified service object.
 *
 * @example {
 *   "host": "nnas",
 *   "name": "apt",
 *   "output": "APT OK: 0 packages available for upgrade (0 critical updates).",
 *   "state": 0
 * }
 */
export interface MonitoringService {
  /**
   * @example "apt"
   */
  name: string

  /**
   * @example "nnas"
   */
  host: string

  /**
   * @example 0
   */
  state: api.ServiceState

  /**
   * @example "APT OK: 0 packages available for upgrade (0 critical updates)."
   */
  output: string
}

export async function getServices(
  state?: api.ServiceState
): Promise<MonitoringService[]> {
  const results = await client.request('objects/services', 'GET', {
    attrs: ['name', 'state', 'last_check_result'],
    joins: ['host.name']
  })

  const services: MonitoringService[] = []
  for (const result of results.results) {
    if (
      (state !== undefined && state === result.attrs.state) ||
      state === undefined
    ) {
      services.push({
        name: result.attrs.name,
        host: result.joins.host.name,
        state: result.attrs.state,
        output: result.attrs.last_check_result.output
      })
    }
  }
  return services
}

export async function sendServiceCheckResult(
  hostName: string,
  serviceName: string,
  status: api.ServiceState,
  pluginOutput: string
): Promise<ProcessCheckResult[]> {
  const results = await api.processCheckResult(client, {
    type: 'Service',
    filter: `host.name=="${hostName}" && service.name=="${serviceName}"`,
    exit_status: status,
    plugin_output: pluginOutput
  })

  if (results.results != null) {
    return results.results
  }
  throw new Error('Failed to send')
}
