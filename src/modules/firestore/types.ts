export interface FirestoreWhereInput {
  field: string
  equals?: any
}

export interface FirestoreGetQueryVariables {
  limit?: number
}

export interface FirestoreQuery {
  get<A>(variables: FirestoreGetQueryVariables): Promise<A>
}
