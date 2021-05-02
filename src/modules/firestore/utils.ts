import firestore from 'firebase'
import { FirestoreGetQueryVariables, FirestoreWhereInput } from './types'

const whereOperators = {
  equals: '==',
  equalsNot: '!=',
  lessThan: '<',
  lessThanOrEqual: '<=',
  greaterThan: '>',
  greaterThanOrEqual: '>=',
  arrayContains: 'array-contains',
  arrayContainsAny: 'array-contains-any',
  in: 'in',
  notIn: 'not-in'
}

export function makeFirestoreWhere(ref: firestore.firestore.Query, fieldName: string, where: FirestoreWhereInput) {
  const field = fieldName === 'id' ? firestore.firestore.FieldPath.documentId() : fieldName

  const keys = Object.keys(whereOperators)

  for (const key of keys) {
    if (key in where) {
      return ref.where(field, whereOperators[key as keyof typeof whereOperators] as firestore.firestore.WhereFilterOp, where[key as keyof typeof where])
    }
  }
  return ref
}

export function makeFirestoreRef(
  collection: string,
  options: FirestoreGetQueryVariables[] = []
) {
  return (db: firestore.firestore.Firestore) => {
    let ref = db.collection(collection) as firestore.firestore.Query

    options.forEach(option => {
      if (option.where) {
        const [fieldName] = Object.keys(option.where)
        ref = makeFirestoreWhere(ref, fieldName, option.where[fieldName as keyof typeof option.where])
      }
      
      if (option.orderBy) {
        option.orderBy.map(({ field, desc }) => {
          ref = ref.orderBy(field, desc ? 'desc' : undefined)
        })
      }
      
      if (option.startAt) {
        ref = ref.startAt(option.startAt)
      }
      
      if (option.startAfter) {
        ref = ref.startAt(option.startAfter)
      }
      
      if (option.endAt) {
        ref = ref.endAt(option.endAt)
      }
      
      if (option.endAfter) {
        ref = ref.endAt(option.endAfter)
      }
      
      if (option.limit) {
        ref = ref.limit(option.limit)
      }      
    })

    return ref
  }
}

export async function getDocument<A = any>(
  doc: firestore.firestore.QueryDocumentSnapshot<A> | firestore.firestore.DocumentReference<A>,
  options: firestore.firestore.GetOptions = { source: 'cache' }
): Promise<A> {
  if (!('data' in doc)) {
    const ref = await doc.get(options)
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
