import firestore from 'firebase'

interface MakeFirestoreQueryOptions {
  limit?: number
}

export function makeFirestoreQuery(
  collection: string,
  options: MakeFirestoreQueryOptions = {}
) {
  return (db: firestore.firestore.Firestore) => {
    console.log({options})
    let query = db.collection(collection)
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
    id: doc.id || 'xxxxxxxxxxxxxxxxxx',
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
