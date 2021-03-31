// @ts-ignore
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
      }
      acc[entry.collection].__doc__[entry.id] = entry.data
      return acc
    }, {} as Fixed),
  }

  const firebase = new MockFirebase(fixtureData)

  return firebase.firestore()
}

export default mockDb([
  {
    collection: 'Todo',
    id: '1',
    data: {
      title: 'Buy milk',
      done: true
    }
  },
  {
    collection: 'Todo',
    id: '3',
    data: {
      title: 'Meditate',
      done: true
    }
  },
  {
    collection: 'Todo',
    id: '2',
    data: {
      title: 'Wash dishes',
      done: false
    }
  },
])
