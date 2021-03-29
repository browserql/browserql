export interface FirestoreDocument {
  id: string
}

export interface Todo extends FirestoreDocument {
  title: string
  done: boolean
}