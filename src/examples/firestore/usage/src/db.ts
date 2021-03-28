import MockFirebase from 'mock-cloud-firestore'
import firestore from 'firebase'

interface Fixture {
  collection: string
  id: string
  data: any
}

interface Fixed {
  [collectionName: string]: {
    __doc__: {
      [id: string]: any
    }
  }
}

function mockDb(fixture: Fixture[]): firestore.firestore.Firestore {
  const fixtureData = {
    __collection__: fixture.reduce((acc, entry) => {
      if (!(entry.collection in acc)) {
        acc[entry.collection] = {
          __doc__: {},
        }
        acc[entry.collection].__doc__[entry.id] = entry.data
      }
      return acc
    }, {} as Fixed),
  }

  const firebase = new MockFirebase(fixtureData)

  return firebase.firestore()
}

export default mockDb([
  {
    collection: 'User',
    id: '1',
    data: [
      {
        title: 'Buy milk',
        done: false
      }
    ]
  }
])
