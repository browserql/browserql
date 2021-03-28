import firestore from 'firebase'

export function makeFirestoreQuery(
  collection: string
) {
  return (db: firestore.firestore.Firestore) => {
    let query = db.collection(collection)
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