import firestore from 'firebase'
import { FirestoreGetQueryVariables } from './types'

export function makeFirestoreQuery(
  collection: string,
  options: FirestoreGetQueryVariables = {}
) {
  return (db: firestore.firestore.Firestore) => {
    let query = db.collection(collection)
    if (options.startAt) {
      // @ts-ignore
      query = query.startAt(options.startAt)
    }
    if (options.startAfter) {
      // @ts-ignore
      query = query.startAt(options.startAfter)
    }
    if (options.endAt) {
      // @ts-ignore
      query = query.endAt(options.endAt)
    }
    if (options.endAfter) {
      // @ts-ignore
      query = query.endAt(options.endAfter)
    }
    if (options.limit) {
      // @ts-ignore
      query = query.limit(options.limit)
    }
    return query
  }
}

export async function getDocument<A = any>(
  doc: firestore.firestore.QueryDocumentSnapshot<A>
) {
  const pretty: any = {
    id: doc.id,
    ...doc.data(),
  }
  for (const a in pretty) {
    if (
      (pretty[a].constructor.name === 'n' ||
        pretty[a].constructor.name === 'r') &&
      typeof pretty[a] === 'object' &&
      pretty[a] !== null &&
      'get' in pretty[a]
    ) {
      const res = await pretty[a].get()
      pretty[a] = await getDocument(res)
    }
  }
  return pretty
}

export async function getDocuments<A = unknown>(
  snapshot: firestore.firestore.QuerySnapshot<firestore.firestore.DocumentData>
) {
  const docs: A[] = []
  snapshot.forEach(async (doc) => {
    docs.push(await getDocument(doc))
  })
  return docs
}
