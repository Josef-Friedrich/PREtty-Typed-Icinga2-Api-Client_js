// https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md

import type { Client } from './client.js'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

import type { Service, User, ServiceState, HostState } from './object-types.js'

/**
 * @see [doc/12-icinga2-api.md L581-L585](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L581-L585)
 */
export interface QueryObjectsParams {
  /**
   * Limited attribute list in the output.
   */
  attrs?: string[]

  /**
   * Join related object types and their attributes specified as list (`?joins=host` for the entire set, or selectively by `?joins=host.name`).
   */
  joins?: string[]

  /**
   * Enable meta information using `?meta=used_by` (references from other objects) and/or `?meta=location` (location information) specified as list. Defaults to disabled.
   */
  meta?: string[]

  /**
   * For example `host.display_name == "Host 1"` or `host.name=="Host 1" && service.name=="Service 1"`
   *
   * https://icinga.com/docs/icinga-2/latest/doc/12-icinga2-api/#filters
   */
  filter?: string
}

export async function queryObjects(
  client: Client,
  object: Object,
  params: QueryObjectsParams = {}
): Promise<ObjectQueriesResult[]> {
  return await client.request(`objects/${object}s`, 'GET', params, {
    returnSingleResult: false
  })
}

export interface Attrs {
  [attr: string]: number | string | Attrs
}

export interface CreateObjectParams {
  templates?: string[]
  attrs: Attrs
  ignore_on_error?: boolean
}

/**
 * `/var/lib/icinga2/api/packages/_api/7bf8b379-90b8-479c-a77b-91354bafe23d/conf.d/hosts/test-host.conf`
 */
export async function createObject(
  client: Client,
  object: Object,
  name: string,
  params: CreateObjectParams
) {
  return await client.request(`objects/${object}s/${name}`, 'PUT', params)
}

export interface DeleteObjectParam {
  /**
   * Delete objects depending on the deleted objects (e.g. services on a host).
   */
  cascade?: boolean
}

export async function deleteObject(
  client: Client,
  object: Object,
  name: string,
  params: DeleteObjectParam = {}
) {
  return await client.request(`objects/${object}s/${name}`, 'DELETE', params)
}

/**
 * @see [doc/12-icinga2-api.md L1064-L1117](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L1064-L1117)
 */
export interface ProcessCheckResultParams {
  type: 'Service' | 'Host'

  /**
   * `host.name=="icinga2-master1.localdomain" && service.name=="passive-ping"`
   */
  filter: string

  /**
   * For services: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN, for hosts: 0=UP, 1=DOWN.
   */
  exit_status: ServiceState | HostState

  /**
   * One or more lines of the plugin main output. Does **not** contain the performance data.
   */
  plugin_output: string

  /**
   * The performance data as array of strings. The raw performance data string can be used too.
   */
  performance_data?: string[] | string

  /**
   * The first entry should be the check commands path, then one entry for each command line option followed by an entry for each of its argument. Alternativly a single string can be used.
   */
  check_command?: string[] | string

  /**
   * Usually the name of the `command_endpoint`
   */
  check_source?: number

  /**
   * The timestamp where a script/process started its execution.
   */
  execution_start?: number

  /**
   * The timestamp where a script/process ended its execution. This timestamp is used in features to determine e.g. the metric timestamp.
   */
  execution_end?: number

  /**
   * Time-to-live duration in seconds for this check result. The next expected check result is `now + ttl` where freshness checks are executed.
   */
  ttl?: number
}

export interface ProcessCheckResult {
  code: number
  status: string
}

/**
 * @see [doc/12-icinga2-api.md L620-L631](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L620-L631)
 */
export interface ObjectQueriesResult {
  /**
   * Full object name.
   *
   * @see [doc/12-icinga2-api.md L626](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L626)
   */
  name: string

  /**
   * Object type.
   *
   * @see [doc/12-icinga2-api.md L627](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L627)
   */
  type: string

  /**
   * Object attributes (can be filtered using the URL parameter `attrs`).
   *
   * @see [doc/12-icinga2-api.md L628](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L628)
   */
  attrs: User | Service

  /**
   * [Joined object types](12-icinga2-api.md#icinga2-api-config-objects-query-joins) as key, attributes as nested dictionary. Disabled by default.
   *
   * @see [doc/12-icinga2-api.md L629](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L629)
   */
  joins: Record<string, User | Service>

  /**
   * Contains `used_by` object references. Disabled by default, enable it using `?meta=used_by` as URL parameter.
   *
   * @see [doc/12-icinga2-api.md L630](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L630)
   */
  meta: Record<string, any>
}

/**
 * https://icinga.com/docs/icinga-2/latest/doc/12-icinga2-api/#process-check-result
 */
export async function processCheckResult(
  client: Client,
  params: ProcessCheckResultParams
): Promise<ProcessCheckResult> {
  return await client.request('actions/process-check-result', 'POST', params)
}
