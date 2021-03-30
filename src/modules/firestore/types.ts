export interface FirestoreWhereInput {
  field: string
  equals?: any
}

export interface FirestoreGetQueryVariables {
  startAt?: number | string
  startAfter?: number | string
  endAt?: number | string
  endAfter?: number | string
  limit?: number | string
}

export interface FirestoreQuery {
  get<A>(variables: FirestoreGetQueryVariables): Promise<A>
}
