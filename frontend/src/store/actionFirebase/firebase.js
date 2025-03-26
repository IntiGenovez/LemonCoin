import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, confirmPasswordReset } from 'firebase/auth'
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

const getUserDocRef = (type, id) => doc(db, 'usuarios', auth.currentUser.uid, type, id)

const getCategoryOrAccountName = async (userId, type, itemId) => {
    const docRef = doc(db, 'usuarios', userId, type, itemId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data().nome : null
}

export const firestore = async (type, method, id, payload) => {
    if(!auth.currentUser) return
    const userId = auth.currentUser.uid
    let docSnap

    switch(method) {
        case 'save':
            return await addDoc(collection(db, 'usuarios', auth.currentUser.uid, type), payload)

        case 'read':
            const querySnapshot= await getDocs(collection(db, 'usuarios', id, type))
            const dataPromises = querySnapshot.docs.map(async (document) => {
                let data = document.data()
                if (data.data) data.data = data.data.toDate()
                data.id = document.id

                if(type === 'movimentações') {
                    const [categoria, conta] = await Promise.all([
                        getCategoryOrAccountName(userId, 'categorias', data.categoriaId),
                        getCategoryOrAccountName(userId, 'contas', data.contaId)
                    ])
                    data.categoria = categoria
                    data.conta = conta
                }
                return data
            })
            return Promise.all(dataPromises)

        case 'readbyid':
            docSnap = await getDoc(getUserDocRef(type, id))
            return docSnap.exists() ? docSnap.data() : null

        case 'delete':
            return await deleteDoc(getUserDocRef(type, id))
        
        case 'update':
            return await setDoc(getUserDocRef(type, id), payload)

        case 'updatebalance':
            const docRef = getUserDocRef(type, id)
            docSnap = await getDoc(docRef)

            if(docSpan.exists()) {
                const data = docSnap.data()
                data.saldo += payload
                await setDoc(docRef, data)
            }
            break
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
            if(!user) {
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
    firestore('usuarios', 'update', userCredential.user?.uid, usuario)
    return userCredential.user
}

const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
}

const updatePassword = async (oobCode, password) => {
    if(!oobCode) throw new Error('Solicitação inválida ou expirada')
    await confirmPasswordReset(auth, oobCode, password)
}

const firebase = { signInUser, signOutUser, signUpUser, resetPassword, getUserData, updatePassword }

export default firebase 