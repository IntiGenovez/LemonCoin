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


export const firestore = async (type, method, id, payload) => {
    let querySnapshot
    if(method === 'save')
        return await addDoc(collection(db, type), payload)

    if(method === 'read') {
        querySnapshot = await getDocs(collection(db, type))
        const arrayFromQuery = []
        let data
        querySnapshot.forEach(doc => {
            data = doc.data()
            data.id = doc.id
            arrayFromQuery.push(data)
        })
        return arrayFromQuery
    }

    if(method === 'delete') {
        await deleteDoc(doc(db, type, id))
    }

    if(method === 'update') {
        console.log(type)
        console.log(id)
        console.log(payload)
        await setDoc(doc(db, type, id), payload)
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