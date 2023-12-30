#! /usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

function seeLink(title, url) {
  return `* @see [${title}](${url})`
}

for (let file of fs.readdirSync('./src')) {
  //   console.log(file)
  file = path.join('src', file)
  let content = fs.readFileSync(file, { encoding: 'utf-8' })

  // #L12C12 -> #L12
  content = content.replace(/(L\d+)C\d+/g, '$1')

  // #L718-L718 -> #L718
  content = content.replace(/(L\d+)-(L\d+)/g, (p, p1, p2) => {
    if (p1 === p2) {
      return p1
    }
    return p
  })

  // * https://github.com/Icinga/icinga2/blob/2c9117b4f71e00b2072e7dbe6c4ea4e48c882a87/doc/09-object-types.md?plain=1#L717/

  content = content.replace(
    new RegExp(
      '\\* ' +
        '(' +
        'https://github.com/Icinga/icinga2/blob/' +
        '[a-f0-9]{40,}' +
        '/' +
        '([^# \\n]+)' +
        '(#(\\S+))?' +
        ')',
      'g'
    ),
    (p, p1, p2, p3, p4) => {
      const url = p1
      let relPath = p2
      relPath = relPath.replace(/\?plain=1/g, '')
      const line = p4

      console.log('url', url)
      console.log('relPath', relPath)
      console.log('line', line)

      if (line != null) {
        return seeLink(`${relPath} ${line}`, url)
      } else if (relPath != null) {
        return seeLink(relPath, url)
      }
      return p
    }
  )

  //fs.writeFileSync(file, content)
}
