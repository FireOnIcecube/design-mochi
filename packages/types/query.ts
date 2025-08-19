export interface QueryParams {
  keyword?: string // 搜尋關鍵字
  orderby?: 'asc' | 'desc' // 排序方式
  page?: number // 分頁
}

export interface QueryFilters {
  [key: string]: string[] // 其他動態 key，值為 string[]
}

export type URLQuery = QueryParams & { filters?: QueryFilters }
