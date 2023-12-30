#! /usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

for (const file of fs.readdirSync('./src')) {
  console.log(file)
  file = path.join('src', file)
  let content = fs.readFileSync(path.join('src', file), { encoding: 'utf-8' })

  content = content.replace(/(L\d+)C\d+/, '$1')
  fs.writeFileSync(file, content)
  console.log(content)
}
