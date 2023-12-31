javascript / not updated since 6 years
https://github.com/jovemnf/icinga-api

javascript / not updated since 5 years
https://www.npmjs.com/package/icinga2-api

corresponding frontend
https://github.com/jtejedera/icinga2_api_request

uses icinga2-api
https://github.com/gyselroth/kube-icinga

https://typedoc.org/tags/group/

```ts
/**
 * @group config
 */

/**
 * @group runtime
 */
```

TypeScript function return type based on input parameter

https://stackoverflow.com/a/54166010


```ts
interface Circle {
  type: 'circle'
  radius: number
}

interface Square {
  type: 'square'
  length: number
}

type TypeName = 'circle' | 'square'

type ObjectTyp<T> = T extends 'circle'
  ? Circle
  : T extends 'square'
  ? Square
  : never

const shapes: (Circle | Square)[] = [
  { type: 'circle', radius: 1 },
  { type: 'circle', radius: 2 },
  { type: 'square', length: 10 }
]

function getItems<T extends TypeName>(type: T): ObjectTyp<T>[] {
  return shapes.filter((s) => s.type == type) as ObjectTyp<T>[]
}

const circles = getItems('circle')
for (const circle of circles) {
  console.log(circle.length)
}
```
