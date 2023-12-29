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

interface ResultsCollection<T> {
  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/createobjecthandler.cpp#L88
   */
  results: T[]
}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L12-L16
 */
enum HAMode {
  HARunOnce,
  HARunEverywhere
}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L57-L92
 */
interface ConfigObject {
  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L59-L68
   */
  __name: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L69
   */
  zone: string

  /**
   * for example `_etc`
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L70
   */
  package: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L71
   */
  templates: string[]

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L72-L74
   */
  source_location: SourceLocation

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L75C8-L75C8
   */
  active: boolean

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L76-L78
   */
  paused: boolean

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L83
   */
  ha_mode: HAMode

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L87C35-L87C54
   */
  original_attributes: Record<string, any>

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L88-L90
   */
  version: number
}

interface SourceLocation {
  first_column: number
  first_line: number
  last_column: number
  last_line: number

  /**
   * "/etc/icinga2-custom/conf.d/api-users.conf"
   */
  path: string
}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti
 *
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L41-L63
 */
interface ApiUser extends ConfigObject {
  /**
   * Password string. Note: This attribute is hidden in API responses.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L14C32-L14C40
   */
  password?: string

  /**
   * Client Common Name (CN).
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L16C18-L16C27
   */
  client_cn?: string

  /**
   * Array of permissions. Either as string or dictionary with the keys `permission` and `filter`. The latter must be specified as function.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L17
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L21-L28
   */
  permissions: string[]
}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L10
 */
interface CustomVarObject extends ConfigObject {
  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L12
   */
  vars: Record<string, any>
}

interface Value {}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkable.ti
 */
interface Checkable extends CustomVarObject {
  /**
   * The name of the check command.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L717C69-L717C99
   */
  check_command: string

  /**
   * The number of times a service is re-checked before changing into a hard state. Defaults to 3.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L718C69-L718C162
   */
  max_check_attempts: bigint

  /**
   * The name of a time period which determines when this service should be checked. Not set by default (effectively 24x7).
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L719C69-L719C187
   */
  check_period: string

  /**
   * Check command timeout in seconds. Overrides the CheckCommand's `timeout` attribute.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L720C69-L720C152
   */
  check_timeout: Value

  /**
   * The check interval (in seconds). This interval is used for checks when the service is in a `HARD` state. Defaults to `5m`.
   *
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L721C69-L721C191
   */
  check_interval: number

  /**
   * This interval is used for checks when the service is in a `SOFT` state. Defaults to `1m`. Note: This does not affect the scheduling [after a passive check result](08-advanced-topics.md#check-result-freshness).
   */
  retry_interval: number

  event_command: string

  volatile: boolean

  enable_active_checks: boolean

  enable_passive_checks: boolean

  enable_event_handler: boolean

  enable_notifications: boolean

  enable_flapping: boolean

  enable_perfdata: boolean

  flapping_ignore_states: string[]

  /**
   * @deprecated
   */
  flapping_threshold: number

  flapping_threshold_low: number

  flapping_threshold_high: number

  notes: string

  notes_url: string

  action_url: string

  icon_image: string

  icon_image_alt: string

  next_check: Timestamp

  check_attempt: bigint

  state_type: StateType

  last_state_type: StateType

  last_reachable: boolean

  last_check_result: CheckResult

  last_state_change: Timestamp

  last_hard_state_change: Timestamp

  last_state_unreachable: Timestamp

  previous_state_change: Timestamp

  severity: bigint

  problem: boolean

  handled: boolean

  next_update: Timestamp

  force_next_check: boolean

  acknowledgement: bigint

  acknowledgement_expiry: Timestamp

  acknowledgement_last_change: Timestamp

  force_next_notification: boolean

  last_check: Timestamp

  downtime_depth: bigint

  flapping_current: number

  flapping_last_change: Timestamp

  flapping: boolean

  command_endpoint: string

  executions: Dictionary
}

interface CheckResult {}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkresult.ti#L38-L43
 */
enum StateType {
  StateTypeSoft = 0,
  StateTypeHard = 1
}

interface Dictionary {}

/**
 * for example `1699475880.364077`
 */
type TimeStamp = number

type Timestamp = number

interface Host {}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/service.ti
 */
interface Service extends Checkable {
  /**
   * The service groups this service belongs to.
   */
  groups: string

  /**
   * A short description of the service.
   */
  display_name: string

  /**
   * The host this service belongs to. There must be a `Host` object with that name.
   */
  host_name: string
  host: Host

  /**
   * The current state (0 = OK, 1 = WARNING, 2 = CRITICAL, 3 = UNKNOWN).
   */
  state: ServiceState

  /**
   * The previous state (0 = OK, 1 = WARNING, 2 = CRITICAL, 3 = UNKNOWN).
   */
  last_state: ServiceState

  /**
   * The last hard state (0 = OK, 1 = WARNING, 2 = CRITICAL, 3 = UNKNOWN).
   */
  last_hard_state: ServiceState

  /**
   * When the last OK state occurred (as a UNIX timestamp).
   */
  last_state_ok: TimeStamp

  /**
   * When the last WARNING state occurred (as a UNIX timestamp).
   */
  last_state_warning: TimeStamp

  /**
   * When the last CRITICAL state occurred (as a UNIX timestamp).
   */
  last_state_critical: TimeStamp

  /**
   * When the last UNKNOWN state occurred (as a UNIX timestamp).
   */
  last_state_unknown: TimeStamp
}

/**
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti
 */
interface User extends CustomVarObject {
  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L14-L22
   */
  display_name: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L23-L25
   */
  groups: string[]

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L26-L30
   */
  period: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L32C11-L32C11
   */
  types: string[]

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L34C3-L34C3
   */
  states: string[]

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L37
   */
  email: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L38
   */
  pager: string

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L40-L42
   */
  enable_notifications: boolean

  /**
   * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L44
   */
  last_notification: number
}

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
export type State = 0 | 1 | 2 | 3

/**
 * 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN
 *
 * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkresult.ti#L25-L31
 */
export enum ServiceState {
  ServiceOK = 0,
  ServiceWarning = 1,
  ServiceCritical = 2,
  ServiceUnknown = 3
}

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
  exit_status: ServiceState | HostStatus

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
