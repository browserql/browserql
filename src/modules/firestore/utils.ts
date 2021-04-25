import firestore from 'firebase'
import { FirestoreGetQueryVariables, FirestoreWhereInput } from './types'

export function makeFirestoreWhere(ref: firestore.firestore.Query, where: FirestoreWhereInput) {
  if ('equals' in where) {
    return ref.where(where.field, '==', where.equals)
  }
  return ref
}

export function makeFirestoreRef(
  collection: string,
  options: FirestoreGetQueryVariables = {}
) {
  return (db: firestore.firestore.Firestore) => {
    let ref = db.collection(collection) as firestore.firestore.Query
    if (options.where) {
      options.where.forEach(where => {
        ref = makeFirestoreWhere(ref, where)
      })
    }
    if (options.orderBy) {
      options.orderBy.map(({ field, desc }) => {
        ref = ref.orderBy(field, desc ? 'desc' : undefined)
      })
    }
    if (options.startAt) {
      ref = ref.startAt(options.startAt)
    }
    if (options.startAfter) {
      ref = ref.startAt(options.startAfter)
    }
    if (options.endAt) {
      ref = ref.endAt(options.endAt)
    }
    if (options.endAfter) {
      ref = ref.endAt(options.endAfter)
    }
    if (options.limit) {
      ref = ref.limit(options.limit)
    }
    return ref
  }
}

export async function getDocument<A = any>(
  doc: firestore.firestore.QueryDocumentSnapshot<A> | firestore.firestore.DocumentReference<A>
): Promise<A> {
  if (!('data' in doc)) {
    const ref = await doc.get({ source: 'cache' })
    return await getDocument(ref) as A
  }

  const data = doc.data()
  const pretty: any = {
    id: doc.id,
    ...data,
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
    docs.push(await getDocument<A>(doc as firestore.firestore.QueryDocumentSnapshot<A>))
  })
  return docs
}
