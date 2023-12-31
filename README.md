[![npm](https://img.shields.io/npm/v/pretiac.svg)](https://npmjs.com/package/pretiac)

# pretiac: PREtty Typed Icinga2 Api Client

## Similar projects 

* [icinga-api](https://github.com/jovemnf/icinga-api): javascript / not updated since 6 years
* [icinga2-api](https://www.npmjs.com/package/icinga2-api): javascript / not updated since 5 years
* [icinga2_api_request](https://github.com/jtejedera/icinga2_api_request) corresponding frontend
* [kube-icinga](https://github.com/gyselroth/kube-icinga): uses icinga2-api

## TypeDoc

https://typedoc.org/tags/group/

```ts
/**
 * @group config
 */

/**
 * @group runtime
 */
```

## Typescript

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