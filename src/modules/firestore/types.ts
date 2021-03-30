export interface FirestoreWhereInput {
  field: string
  equals?: any
}

export interface FirestoreGetQueryVariables {
  startAt?: number
  endAt?: number
  limit?: number
}

export interface FirestoreQuery {
  get<A>(variables: FirestoreGetQueryVariables): Promise<A>
}
