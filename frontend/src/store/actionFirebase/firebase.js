import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, deleteDoc, setDoc, doc } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const env = import.meta.env

const firebaseConfig = {
    apiKey: env.VITE_API_KEY,
    authDomain: env.VITE_AUTH_DOMAIN,
    projectId: env.VITE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
    appId: env.VITE_APP_ID,
    measurementId: env.VITE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const analytics = getAnalytics(app)


export const firestore = async (type, method, payload) => {
    let docRef
    let querySnapshot
    if(method === 'save')
        docRef = await addDoc(collection(db, type), payload)

    if(method === 'read') {
        querySnapshot = await getDocs(collection(db, type))
        querySnapshot.forEach(doc => console.log(`${doc.id} → ${doc.data()}`))
        return querySnapshot
    }

    if(method === 'delete') {
        await deleteDoc(doc(db, type, payload))
    }

    if(method === 'update') {
        await setDoc(doc(db, type, payload.id), payload)
    }
        
}

export const isUserSignedIn = (callback) => {
    return onAuthStateChanged(auth, callback)
}

const signInUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

const signOutUser = async () => {
    await signOut(auth)
}

const signUpUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
}

const firebase = { signInUser, signOutUser, signUpUser, resetPassword }

export default firebase 