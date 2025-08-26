// 測試代碼，同步 url 的 composable

import { reactive, watch, toRefs } from 'vue'
import { LocationQueryRaw, useRoute, useRouter } from 'vue-router'

type QueryType = 'string' | 'number' | 'boolean' | 'string[]'

interface QueryOptions<T = unknown> {
  type?: QueryType
  default?: T
}

type QuerySchema = Record<string, QueryOptions>

export function useUrlQuery(schema: QuerySchema) {
  const route = useRoute()
  const router = useRouter()

  // 建立 reactive state
  const state: Record<string, unknown> = reactive({})

  // 初始化 state
  for (const key in schema) {
    const val = route.query[key]
    state[key] = parseQueryValue(val, schema[key])
  }

  // 當 route.query 改變，自動同步 state
  watch(
    () => route.query,
    (newQuery) => {
      for (const key in schema) {
        state[key] = parseQueryValue(newQuery[key], schema[key])
      }
    },
    { deep: true },
  )

  // 更新 URL query
  function setQuery(key: string, value: unknown) {
    if (!(key in schema)) {
      console.warn(`[useUrlQuery] key '${key}' not in schema, auto adding`)
      schema[key] = { type: detectType(value) }
    }

    const serialized = serializeQueryValue(value, schema[key])

    // 斷言為 LocationQueryRaw
    const newQuery: LocationQueryRaw = { ...route.query, [key]: serialized } as LocationQueryRaw

    router.replace({
      path: route.path,
      query: newQuery,
    })
  }

  return { ...toRefs(state), setQuery }
}

// 解析 query string -> JS value
function parseQueryValue(val: unknown, opt: QueryOptions) {
  if (val === undefined) return opt.default
  switch (opt.type) {
    case 'boolean':
      return val === 'true'
    case 'number':
      return Number(val)
    case 'string[]':
      return Array.isArray(val) ? val : [val as string]
    default:
      return val
  }
}

// JS value -> URL query string
function serializeQueryValue(val: unknown, opt: QueryOptions) {
  if (val === undefined) return opt.default

  switch (opt.type) {
    case 'boolean':
      return val === 'true'
    case 'number':
      return Number(val)
    case 'string[]':
      return Array.isArray(val) ? val : [val as string]
    default:
      return val
  }
}

// 自動推斷型別
function detectType(val: unknown): QueryType {
  if (typeof val === 'boolean') return 'boolean'
  if (typeof val === 'number') return 'number'
  if (Array.isArray(val)) return 'string[]'
  return 'string'
}
