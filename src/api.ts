import type { Client } from './client.js'

export type HttpMethod = 'GET' | 'POST'

/**
 * https://github.com/Icinga/icinga2/blob/master/doc/09-object-types.md#object-types-monitoring
 */
type MonitoringObject =
  | 'ApiUser'
  | 'CheckCommand'
  | 'Dependency'
  | 'Endpoint'
  | 'EventCommand'
  | 'Host'
  | 'HostGroup'
  | 'Notification'
  | 'NotificationCommand'
  | 'ScheduledDowntime'
  | 'Service'
  | 'ServiceGroup'
  | 'TimePeriod'
  | 'User'
  | 'UserGroup'
  | 'Zone'

/**
 * https://github.com/Icinga/icinga2/blob/master/doc/09-object-types.md#runtime-objects-
 */
type RuntimeObject = 'Comment' | 'Downtime'

/**
 * https://github.com/Icinga/icinga2/blob/master/doc/09-object-types.md#features-
 */
type Feature =
  | 'ApiListener'
  | 'CheckerComponent'
  | 'CompatLogger'
  | 'ElasticsearchWriter'
  | 'ExternalCommandListener'
  | 'FileLogger'
  | 'GelfWriter'
  | 'GraphiteWriter'
  | 'IcingaApplication'
  | 'IcingaDB'
  | 'IdoMySqlConnection'
  | 'IdoPgsqlConnection'
  | 'InfluxdbWriter'
  | 'Influxdb2Writer'
  | 'JournaldLogger'
  | 'LiveStatusListener'
  | 'NotificationComponent'
  | 'OpenTsdbWriter'
  | 'PerfdataWriter'
  | 'SyslogLogger'
  | 'WindowsEventLogLogger'

type Object = MonitoringObject | RuntimeObject | Feature

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L581-L585
 */
interface GetObjectsParams {
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
}

export async function getObjects(
  client: Client,
  objects: Object,
  params: GetObjectsParams = {}
) {
  return await client.request(`objects/${objects}s`, 'GET', params)
}

/**
 * 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN
 */
export type Status = 0 | 1 | 2 | 3

/**
 * 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN
 */
export type ServiceStatus = Status

/**
 * 0=UP, 1=DOWN.
 */
export type HostStatus = 0 | 1

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L1064-L1117
 */
interface ProcessCheckResultParams {
  type: 'Service' | 'Host'

  /**
   * `host.name=="icinga2-master1.localdomain" && service.name=="passive-ping"`
   */
  filter: string

  /**
   * For services: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN, for hosts: 0=UP, 1=DOWN.
   */
  exit_status: ServiceStatus | HostStatus

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

interface Result {
  code: number
  status: string
}

interface ProcessCheckResultResult {
  results: Result[]
}

/**
 * https://icinga.com/docs/icinga-2/latest/doc/12-icinga2-api/#process-check-result
 */
export async function processCheckResult(
  client: Client,
  params: ProcessCheckResultParams
): Promise<ProcessCheckResultResult> {
  return await client.request('actions/process-check-result', 'POST', params)
}
