/**
 * Listed in the order as in this [Markdown document](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md)
 *
 * @module object-types
 */

/**
 * @see [doc/09-object-types.md object-types-monitoring](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md#object-types-monitoring)
 */
export type MonitoringObject =
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
export type RuntimeObject = 'Comment' | 'Downtime'

/**
 * @see [doc/09-object-types.md features-](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md#features-)
 */
export type Feature =
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

export type Object = MonitoringObject | RuntimeObject | Feature

/***************************************************************************
 * Delegated interfaces and types
 **************************************************************************/

export interface SourceLocation {
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
 * @see [lib/base/configobject.ti L12-L16](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/base/configobject.ti#L12-L16)
 */
export enum HAMode {
  HARunOnce,
  HARunEverywhere
}

/**
 * @see [lib/icinga/checkresult.ti L38-L43](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/checkresult.ti#L38-L43)
 */
export enum StateType {
  StateTypeSoft = 0,
  StateTypeHard = 1
}

export interface Dictionary {}

/**
 * for example `1699475880.364077`
 */
export type TimeStamp = number

export type Timestamp = number

export interface Value {}

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

export interface CheckResult {}

/***************************************************************************
 * Interface from which the object types inherit
 **************************************************************************/

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

/**
 * @see [lib/icinga/customvarobject.ti L10](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L10)
 */
interface CustomVarObject extends ConfigObject {
  /**
   * @see [lib/icinga/customvarobject.ti L12](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/customvarobject.ti#L12)
   */
  vars: Record<string, any>
}

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

/***************************************************************************
 * The individual object types
 **************************************************************************/

/**
 * ApiUser objects are used for authentication against the [Icinga 2 API](12-icinga2-api.md#icinga2-api-authentication).
 *
 * @example
 *
 * ```
 * object ApiUser "root" {
 *   password = "mysecretapipassword"
 *   permissions = [ "*" ]
 * }
 * ```
 *
 * @see [lib/remote/apiuser.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti)
 * @see [doc/09-object-types.md L41-L63](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L41-L63)
 */
export interface ApiUser extends ConfigObject {
  /**
   * Password string. Note: This attribute is hidden in API responses.
   *
   * @group config
   * @see [lib/remote/apiuser.ti L14](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L14)
   */
  password?: string

  /**
   * Client Common Name (CN).
   *
   * @group config
   * @see [lib/remote/apiuser.ti L16](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L16)
   */
  client_cn?: string

  /**
   * Array of permissions. Either as string or dictionary with the keys `permission` and `filter`. The latter must be specified as function.
   *
   * @group config
   * @see [lib/remote/apiuser.ti L17](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L17)
   * @see [lib/remote/apiuser.ti L21-L28](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/remote/apiuser.ti#L21-L28)
   */
  permissions: string[]
}

/**
 * A check command definition. Additional default command custom variables can be
 * defined here.
 *
 * Example:
 *
 * ```
 * object CheckCommand "http" {
 *   command = [ PluginDir + "/check_http" ]
 *
 *   arguments = {
 *     "-H" = "$http_vhost$"
 *     "-I" = "$http_address$"
 *     "-u" = "$http_uri$"
 *     "-p" = "$http_port$"
 *     "-S" = {
 *       set_if = "$http_ssl$"
 *     }
 *     "--sni" = {
 *       set_if = "$http_sni$"
 *     }
 *     "-a" = {
 *       value = "$http_auth_pair$"
 *       description = "Username:password on sites with basic authentication"
 *     }
 *     "--no-body" = {
 *       set_if = "$http_ignore_body$"
 *     }
 *     "-r" = "$http_expect_body_regex$"
 *     "-w" = "$http_warn_time$"
 *     "-c" = "$http_critical_time$"
 *     "-e" = "$http_expect$"
 *   }
 *
 *   vars.http_address = "$address$"
 *   vars.http_ssl = false
 *   vars.http_sni = false
 * }
 * ```
 *
 * @see [doc/09-object-types.md L65-L114](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L65-L114)
 * @see [lib/icinga/command.ti](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/command.ti)
 */
export interface CheckCommand {}

/**
 *
 * Command arguments can be defined as key-value-pairs in the `arguments`
 * dictionary. Best practice is to assign a dictionary as value which
 * provides additional details such as the `description` next to the `value`.
 *
 * ```
 *   arguments = {
 *     "--parameter" = {
 *       description = "..."
 *       value = "..."
 *     }
 *   }
 * ```
 * @see [doc/09-object-types.md L117-L150](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L117-L150)
 * @see [lib/icinga/command.ti L30-L46](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/lib/icinga/command.ti#L30-L46)
 */
export interface CheckCommandArguments {}

/*
 * Dependency objects are used to specify dependencies between hosts and services. Dependencies
 * can be defined as Host-to-Host, Service-to-Service, Service-to-Host, or Host-to-Service
 * relations.
 * 
 * > **Best Practice**
 * >
 * > Rather than creating a `Dependency` object for a specific host or service it is usually easier
 * > to just create a `Dependency` template and use the `apply` keyword to assign the
 * > dependency to a number of hosts or services. Use the `to` keyword to set the specific target
 * > type for `Host` or `Service`.
 * > Check the [dependencies](03-monitoring-basics.md#dependencies) chapter for detailed examples.
 * 
 * Service-to-Service Example:
 * 
 * ```
 * object Dependency "webserver-internet" {
 *   parent_host_name = "internet"
 *   parent_service_name = "ping4"
 * 
 *   child_host_name = "webserver"
 *   child_service_name = "ping4"
 * 
 *   states = [ OK, Warning ]
 * 
 *   disable_checks = true
 * }
 * ```
 * 
 * Host-to-Host Example:
 * 
 * ```
 * object Dependency "webserver-internet" {
 *   parent_host_name = "internet"
 * 
 *   child_host_name = "webserver"
 * 
 *   states = [ Up ]
 * 
 *   disable_checks = true
 * }
 * ```
 * 
 * @see [doc/09-object-types.md L153-L258](https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L153-L258)
 */
export interface Dependency {

}

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
