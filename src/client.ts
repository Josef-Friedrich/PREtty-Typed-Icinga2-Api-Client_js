import * as fs from 'node:fs'

import type { HttpMethod } from './api.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

interface Config {
  domain: string

  user: string

  password: string

  port: number
}

function readConfig(): Config {
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

  public async request(path: string, method: HttpMethod, data: any) {
    const response = await fetch(this.getUrl(path), {
      headers: this.getHeaders(method),
      method: 'POST',
      body: JSON.stringify(data)
    })
    return await response.json()
  }
}

export function getClient(): Client {
  const config = readConfig()
  return new Client(config.domain, config.user, config.password, config.port)
}
