#! /usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

function seeLink(title, url) {

    return ` @see [${title}](${url})`
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

  content = content.replace(/\* https:\S+\/doc\/(\S+)\?\S+#(\S+)/g, (p, p1, p2) => {
    console.log(p, p1, p2)
    if (p1 != null && p2 != null) {
      return seeLink(`${p1} ${p2}`, p)
    }
    return p
  })


  fs.writeFileSync(file, content)
}
