import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, setDoc, doc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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
    let querySnapshot, docSnap
    if(method === 'save') {
        return await addDoc(collection(db, 'usuarios', auth.currentUser.uid, type), payload)
    }

    if(method === 'read') {
        const arrayFromQuery = new Array()
        querySnapshot = await getDocs(collection(db, 'usuarios', id, type))
        for (const document of querySnapshot.docs) {
            let data = document.data()
            if (data.data) data.data = data.data.toDate()
            data.id = document.id

            if (type === 'movimentações') {
                let docRef = doc(db, 'usuarios', id, 'categorias', data.categoriaId)
                let docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    data.categoria = docSnap.data().nome
                }

                docRef = doc(db, 'usuarios', id, 'contas', data.contaId)
                docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    data.conta = docSnap.data().nome
                }
            }
            arrayFromQuery.push(data)
        }
        return arrayFromQuery
    }

    if(method === 'readbyid') {
        const docRef = doc(db, type, id)
        docSnap = await getDoc(docRef)
        return docSnap.data()
    }

    if(method === 'delete') {
        if (auth.currentUser) return await deleteDoc(doc(db, 'usuarios', auth.currentUser.uid, type, id))
        else return await deleteDoc(doc(db, type, id))
    }

    if(method === 'update') {
        if (auth.currentUser) return await setDoc(doc(db, 'usuarios', auth.currentUser.uid, type, id), payload)
        else return await setDoc(doc(db, type, id), payload)
    }
     
    if(method === 'updateBalance') {
        const docRef = doc(db, 'usuarios', auth.currentUser.uid, type, id)
        docSnap = await getDoc(docRef)
        const data = docSnap.data()
        console.log(payload)
        data.saldo = data.saldo + payload

        await setDoc(doc(db, 'usuarios', auth.currentUser.uid, type, id), data)
    }
}

export const isUserSignedIn = (callback) => {
    return onAuthStateChanged(auth, callback)
}

const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    const usuario = await getUserData()
    return usuario
}

const getUserData = async () => {
    return new Promise((resolve) => {
        isUserSignedIn(async (user) => {
            if (!user) {
                resolve(null) // Retorna null se o usuário não estiver logado
                return
            }
            
            const categorias = await firestore('categorias', 'read', user.uid)
            const contas = await firestore('contas', 'read', user.uid)
            const movimentacoes = await firestore('movimentações', 'read', user.uid)
            const usuario = await firestore('usuarios', 'readbyid', user.uid)

            resolve({
                usuario,
                categorias,
                contas,
                movimentacoes
            })
        })
    })
}

const signOutUser = async () => {
    await signOut(auth)
}

const signUpUser = async (usuario) => {
    const email = usuario.email
    const password = usuario.senha
    delete usuario.email
    delete usuario.senha
    delete usuario.confirmarSenha

    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    firestore('usuarios', 'save', userCredential.user?.uid, usuario)
    return userCredential.user
}

const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
}

const firebase = { signInUser, signOutUser, signUpUser, resetPassword, getUserData }

export default firebase 