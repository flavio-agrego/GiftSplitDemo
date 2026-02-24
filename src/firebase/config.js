import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyCsJ5XI9ou0pEbiEza2Dw-FlmetbCab4jA",
  authDomain: "giftsplit-remastered.firebaseapp.com",
  databaseURL: "https://giftsplit-remastered-default-rtdb.firebaseio.com",
  projectId: "giftsplit-remastered",
  storageBucket: "giftsplit-remastered.firebasestorage.app",
  messagingSenderId: "916023567392",
  appId: "1:916023567392:web:da98e4da338f4de074c845"
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getDatabase(app)