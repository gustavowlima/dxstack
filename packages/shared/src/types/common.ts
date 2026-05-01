export type ID = string

export interface Pagination {
  page: number
  perPage: number
  total: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: Pagination
}
