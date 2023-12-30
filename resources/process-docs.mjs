#! /usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

for (let file of fs.readdirSync('./src')) {
  //   console.log(file)
  file = path.join('src', file)
  let content = fs.readFileSync(file, { encoding: 'utf-8' })

  content = content.replace(/(L\d+)C\d+/g, '$1')

  content = content.replace(/(L\d+)-(L\d+)/g, (p, p1, p2) => {
    console.log(p1, p2)
    if (p1 === p2) {
      return p1
    } else {
      p
    }
  })
  //   fs.writeFileSync(file, content)
  //   console.log(content)
}
