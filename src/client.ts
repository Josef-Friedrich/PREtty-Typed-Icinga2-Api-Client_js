import * as fs from 'node:fs'

import type { HttpMethod } from './low-level-api.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export interface Config {
  domain: string

  user: string

  password: string

  port: number
}

export function readConfig(): Config {
  return JSON.parse(
    fs.readFileSync('/etc/icinga2-api-client.json', { encoding: 'utf-8' })
  )
}

export class Client {
  private domain: string

  private user: string

  private password: string

  private port: number

  constructor(domain: string, user: string, password: string, port: number) {
    this.domain = domain
    this.user = user
    this.password = password
    this.port = port
  }

  private getBasicAuthorization(): string {
    return (
      'Basic ' + Buffer.from(this.user + ':' + this.password).toString('base64')
    )
  }

  private getHeaders(method: HttpMethod) {
    return {
      Accept: 'application/json',
      'X-HTTP-Method-Override': method,
      Authorization: this.getBasicAuthorization()
    }
  }

  private getUrl(path: string): string {
    return `https://${this.domain}:${this.port}/v1/${path}`
  }

  public async request(
    path: string,
    method: HttpMethod,
    data: any,
    config: RequestConfig = { returnSingleResult: true }
  ) {
    const response = await fetch(this.getUrl(path), {
      headers: this.getHeaders(method),
      method: 'POST',
      body: JSON.stringify(data)
    })

    const body = await response.json()

    if (config.throwError && response.status > 300) {
      throw new Error(body)
    }

    // Successful requests will send back a response body containing a results list.
    if (
      body.results != null &&
      body.results.length === 1 &&
      config.returnSingleResult
    ) {
      return body.results[0]
    }
    return body.results
  }
}

export interface RequestConfig {
  throwError?: boolean
  /**
   * Return a single result as a single item rather than a list.
   */
  returnSingleResult?: boolean
}

export function getClient(): Client {
  const config = readConfig()
  return new Client(config.domain, config.user, config.password, config.port)
}
