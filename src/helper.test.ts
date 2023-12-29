import { test } from "vitest"

export function debug(result: any) {
  console.log(JSON.stringify(result, null, 2))
}

export function getFirstResult(result: any) {
  return result.results[0]
}

export function debugFirst(result: any) {
  debug(getFirstResult(result))
}

test('Dummy', () => {
  
})