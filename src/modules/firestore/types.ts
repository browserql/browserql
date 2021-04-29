export interface FirestoreWhereInput {
  field: string
  equals?: any
  in?: any[]
  equalsNot?: any
  notIn?: any[]
  lessThan?: number
  lessThanOrEqual?: number
  greaterThan?: number
  greaterThanOrEqual?: number
  arrayContains?: any
  arrayContainsAny?: any[]
}

export interface FirestoreGetQueryVariables {
  startAt?: number | string
  startAfter?: number | string
  endAt?: number | string
  endAfter?: number | string
  limit?: number
  orderBy?: FirestoreOrderBy[]
  where?: FirestoreWhereInput[]
}

export interface FirestoreOrderBy {
  field: string
  desc?: boolean
}

export interface FirestoreQuery {
  get<A>(variables: FirestoreGetQueryVariables): Promise<A>
}
