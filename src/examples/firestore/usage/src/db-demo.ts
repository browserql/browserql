import firebase from 'firebase/app'
import 'firebase/firestore'

const firestoreConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  projectId: process.env.FIRESTORE_PROJECT_ID,
  appId: process.env.FIRESTORE_AP_ID,
  authDomain: process.env.FIRESTORE_AUTH_DOMAIN
}

firebase.initializeApp(firestoreConfig)

export default firebase.firestore()
