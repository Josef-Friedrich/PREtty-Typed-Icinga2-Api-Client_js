// https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md

import type { Client } from './client.js'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * @see [doc/09-object-types.md object-types-monitoring](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md#object-types-monitoring)
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
 * @see [doc/09-object-types.md runtime-objects-](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md#runtime-objects-)
 */
type RuntimeObject = 'Comment' | 'Downtime'

/**
 * @see [doc/09-object-types.md features-](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md#features-)
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
 * @see [lib/base/configobject.ti L12-L16](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L12-L16)
 */
enum HAMode {
  HARunOnce,
  HARunEverywhere
}

/**
 * @see [lib/base/configobject.ti L57-L92](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L57-L92)
 */
interface ConfigObject {
  /**
   * @see [lib/base/configobject.ti L59-L68](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L59-L68)
   */
  __name: string

  /**
   * @see [lib/base/configobject.ti L69](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L69)
   */
  zone: string

  /**
   * for example `_etc`
   *
   * @see [lib/base/configobject.ti L70](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L70)
   */
  package: string

  /**
   * @see [lib/base/configobject.ti L71](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L71)
   */
  templates: string[]

  /**
   * @see [lib/base/configobject.ti L72-L74](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L72-L74)
   */
  source_location: SourceLocation

  /**
   * @see [lib/base/configobject.ti L75](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L75)
   */
  active: boolean

  /**
   * @see [lib/base/configobject.ti L76-L78](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L76-L78)
   */
  paused: boolean

  /**
   * @see [lib/base/configobject.ti L83](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L83)
   */
  ha_mode: HAMode

  /**
   * @see [lib/base/configobject.ti L87](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L87)
   */
  original_attributes: Record<string, any>

  /**
   * @see [lib/base/configobject.ti L88-L90](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L88-L90)
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
 * @see [lib/remote/apiuser.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti)
 * @see [doc/09-object-types.md L41-L63](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L41-L63)
 */
export interface ApiUser extends ConfigObject {
  /**
   * Password string. Note: This attribute is hidden in API responses.
   *
   * @see [lib/remote/apiuser.ti L14](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L14)
   */
  password?: string

  /**
   * Client Common Name (CN).
   *
   * @see [lib/remote/apiuser.ti L16](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L16)
   */
  client_cn?: string

  /**
   * Array of permissions. Either as string or dictionary with the keys `permission` and `filter`. The latter must be specified as function.
   *
   * @see [lib/remote/apiuser.ti L17](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L17)
   * @see [lib/remote/apiuser.ti L21-L28](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L21-L28)
   */
  permissions: string[]
}

/**
 * @see [lib/icinga/customvarobject.ti L10](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L10)
 */
interface CustomVarObject extends ConfigObject {
  /**
   * @see [lib/icinga/customvarobject.ti L12](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L12)
   */
  vars: Record<string, any>
}

interface Value {}

/**
 * @see [lib/icinga/checkable.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkable.ti)
 */
interface Checkable extends CustomVarObject {
  /**
   * The name of the check command.
   *
   * @see [doc/09-object-types.md L717](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L717)
   */
  check_command: string

  /**
   * The number of times a service is re-checked before changing into a hard state. Defaults to 3.
   *
   * @see [doc/09-object-types.md L718](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L718)
   */
  max_check_attempts: bigint

  /**
   * The name of a time period which determines when this service should be checked. Not set by default (effectively 24x7).
   *
   * @see [doc/09-object-types.md L719](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L719)
   */
  check_period: string

  /**
   * Check command timeout in seconds. Overrides the CheckCommand's `timeout` attribute.
   *
   * @see [doc/09-object-types.md L720](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L720)
   */
  check_timeout: Value

  /**
   * The check interval (in seconds). This interval is used for checks when the service is in a `HARD` state. Defaults to `5m`.
   *
   * @see [doc/09-object-types.md L721](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L721)
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
 * @see [lib/icinga/checkresult.ti L38-L43](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkresult.ti#L38-L43)
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

/**
 * @see [lib/icinga/host.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti)
 */
export interface Host extends Checkable {
  /**
   * A list of host groups this host belongs to.
   *
   * @see [lib/icinga/host.ti L18-L20](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L18-L20)
   */
  groups: string[]

  /**
   * A short description of the host (e.g. displayed by external interfaces instead of the name if set).
   *
   * @see [lib/icinga/host.ti L22-L30](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L22-L30)
   */
  display_name: string

  /**
   * The host's IPv4 address. Available as command runtime macro `$address$` if set.
   *
   * @see [lib/icinga/host.ti L32](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L32)
   */
  address: string

  /**
   * The host's IPv6 address. Available as command runtime macro `$address6$` if set.
   *
   * @see [lib/icinga/host.ti L33](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L33)
   */
  address6: string

  /**
   * The current state (0 = UP, 1 = DOWN).
   *
   * @see [lib/icinga/host.ti L35-L37](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L35-L37)
   */
  state: HostState

  /**
   * The previous state (0 = UP, 1 = DOWN).
   *
   * @see [lib/icinga/host.ti L38-L40](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L38-L40)
   */
  last_state: HostState

  /**
   * The last hard state (0 = UP, 1 = DOWN).
   *
   * @see [lib/icinga/host.ti L41-L43](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L41-L43)
   */
  last_hard_state: HostState

  /**
   * When the last UP state occurred (as a UNIX timestamp).
   *
   * @see [lib/icinga/host.ti L44](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L44)
   */
  last_state_up: Timestamp

  /**
   * When the last DOWN state occurred (as a UNIX timestamp).
   *
   * @see [lib/icinga/host.ti L45](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/host.ti#L45)
   */
  last_state_down: Timestamp
}

/**
 * @see [lib/icinga/service.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/service.ti)
 */
export interface Service extends Checkable {
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
 * @see [lib/icinga/user.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti)
 */
export interface User extends CustomVarObject {
  /**
   * A short description of the user.
   * 
   * @see [lib/icinga/user.ti L14-L22](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L14-L22)
   * @see [doc/09-object-types.md L923](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L923)
   */
  display_name: string

  /**
   * An array of group names.
   *
   * @see [lib/icinga/user.ti L23-L25](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L23-L25)
   * @see [doc/09-object-types.md L927](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L927)
   */
  groups: string[]

  /**
   * The name of a time period which determines when a notification for this user should be triggered. Not set by default (effectively 24x7).
   *
   * @see [lib/icinga/user.ti L26-L30](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L26-L30)
   * @see [doc/09-object-types.md L929](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L929)
   */
  period: string

  /**
   * A set of type filters when a notification for this user should be triggered. By default everything is matched.
   *
   * @see [lib/icinga/user.ti L32](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L32)
   * @see [doc/09-object-types.md L930](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L930)
   */
  types: string[]

  /**
   * A set of state filters when a notification for this should be triggered. By default everything is matched.
   *
   * @see [lib/icinga/user.ti L34](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L34)
   * @see [doc/09-object-types.md L931](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L931)
   */
  states: string[]

  /**
   * An email string for this user. Useful for notification commands.
   *
   * @see [lib/icinga/user.ti L37](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L37)
   * @see [doc/09-object-types.md L924](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L924)
   */
  email: string

  /**
   * A pager string for this user. Useful for notification commands.
   *
   * @see [lib/icinga/user.ti L38](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L38)
   * @see [doc/09-object-types.md L925](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L925)
   */
  pager: string

  /**
   * Whether notifications are enabled for this user. Defaults to true.
   *
   * @see [lib/icinga/user.ti L40-L42](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L40-L42)
   * @see [doc/09-object-types.md L928](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L928)
   */
  enable_notifications: boolean

  /**
   * When the last notification was sent for this user (as a UNIX timestamp).
   *
   * @see [lib/icinga/user.ti L44](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/user.ti#L44)
   * @see [doc/09-object-types.md L937](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L937)
   */
  last_notification: number
}

/**
 * @see [doc/12-icinga2-api.md L581-L585](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L581-L585)
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
  params: GetObjectsParams = {}
): Promise<ObjectQueriesResult[]> {
  return await client.request(`objects/${object}s`, 'GET', params, {
    returnSingleResult: false
  })
}

interface Attrs {
  [attr: string]: number | string | Attrs
}

interface PutObjectParams {
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
  params: PutObjectParams
) {
  return await client.request(`objects/${object}s/${name}`, 'PUT', params)
}

interface DeleteObjectParam {
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
 * 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN
 */
export type State = 0 | 1 | 2 | 3

/**
 * 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN
 *
 * @see [lib/icinga/checkresult.ti L25-L31](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkresult.ti#L25-L31)
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
export enum HostState {
  HostUp = 0,
  HostDown = 1
}
/**
 * @see [doc/12-icinga2-api.md L1064-L1117](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/12-icinga2-api.md?plain=1#L1064-L1117)
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
interface ObjectQueriesResult {
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
