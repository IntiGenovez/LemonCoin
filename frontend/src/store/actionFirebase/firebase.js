import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, reauthenticateWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, confirmPasswordReset, deleteUser, AuthCredential, EmailAuthProvider } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, setDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
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
    if (type === 'categorias' && itemId === 0) return 'Atualização de Conta'
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
            docSnap = await getDoc(doc(db, 'usuarios', id))
            return docSnap.exists() ? docSnap.data() : null

        case 'delete':
            if(!id) throw new Error(`${type.slice(0, -1).replace(/^./, c => c.toUpperCase())} não encontrado (a)!`)
            return await deleteDoc(getUserDocRef(type, id))
        
        case 'update':
            delete payload.id
            if(!id) throw new Error(`${type.slice(0, -1).replace(/^./, c => c.toUpperCase())} não encontrado (a)!`)
            if(id === auth.currentUser.uid) return await setDoc(doc(db, 'usuarios', auth.currentUser.uid), payload)
            return await setDoc(getUserDocRef(type, id), payload)
            
        case 'updatebalance':
            if(!id) throw new Error(`${type.slice(0, -1).replace(/^./, c => c.toUpperCase())} não encontrado (a)!`)
            const docRef = getUserDocRef(type, id)
            docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                const data = docSnap.data()
                data.saldo += payload
                await setDoc(docRef, data)
            }
            break
    }
}

const subscribeMovements = dispatch => {
    if(!auth.currentUser) return
    onSnapshot(collection(db, 'usuarios', auth.currentUser.uid, 'movimentações'), (snapshot) => {
        const movimentacoes = snapshot.docs.map(async document => {
            const data = document.data()

            const [categoria, conta] = await Promise.all([
                getCategoryOrAccountName(auth.currentUser.uid, 'categorias', data.categoriaId),
                getCategoryOrAccountName(auth.currentUser.uid, 'contas', data.contaId)
            ])
            data.categoria = categoria
            data.conta = conta

            return { ...data, id: document.id }
        })
        Promise.all(movimentacoes).then(movimentacoes => {
            dispatch({ type: 'atualizarMovimentacoes', payload: movimentacoes })
        })
    })
}

const subscribeCategories = dispatch => {
    if(!auth.currentUser) return
    onSnapshot(collection(db, 'usuarios', auth.currentUser.uid, 'categorias'), (snapshot) => {
        const categorias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        dispatch({ type: 'atualizarCategorias', payload: categorias })
    })
}

const subscribeUser = dispatch => {
    if(!auth.currentUser) return
    onSnapshot(doc(db, 'usuarios', auth.currentUser.uid), (snapshot) => {
        const usuario = { id: auth.currentUser.uid, ...snapshot.data() }
        dispatch({ type: 'atualizarUsuario', payload: usuario })
    })
}

const subscribeAccounts = dispatch => {
    if(!auth.currentUser) return
    onSnapshot(collection(db, 'usuarios', auth.currentUser.uid, 'contas'), (snapshot) => {
        const contas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        dispatch({ type: 'atualizarContas', payload: contas })
    })
}

export const isUserSignedIn = (callback) => {
    return onAuthStateChanged(auth, callback)
}

const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    const usuario = await getUserData()
    usuario.usuario.email = auth.currentUser.email
    usuario.usuario.id = auth.currentUser.uid
    return usuario
}

const getUserData = async () => {
    return new Promise((resolve) => {
        isUserSignedIn(async (user) => {
            if(!user) {
                console.log(user)
                resolve(null) // Retorna null se o usuário não estiver logado
                return
            }
            
            const categorias = await firestore('categorias', 'read', user.uid)
            const contas = await firestore('contas', 'read', user.uid)
            const movimentacoes = await firestore('movimentações', 'read', user.uid)
            const usuario = await firestore('usuarios', 'readbyid', user.uid)
            usuario.email = auth.currentUser.email
            usuario.id = auth.currentUser.uid

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
    console.log(usuario)
    firestore('usuarios', 'update', userCredential.user?.uid, usuario)
    firestore('categorias', 'save', null, { nome: 'Alimentação' })
    firestore('categorias', 'save', null, { nome: 'Moradia' })
    firestore('categorias', 'save', null, { nome: 'Transporte' })
    firestore('categorias', 'save', null, { nome: 'Lazer' })
    firestore('categorias', 'save', null, { nome: 'Saúde' })
    userCredential.user.email = auth.currentUser.email
    return userCredential.user
}

const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
}

const updatePassword = async (oobCode, password) => {
    if(!oobCode) throw new Error('Solicitação inválida ou expirada')
    await confirmPasswordReset(auth, oobCode, password)
}

const removeUser = async password => {
    if(!auth.currentUser) return
    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, password))
    await deleteUser(auth.currentUser)
}

const firebase = { 
    signInUser, 
    signOutUser, 
    signUpUser, 
    resetPassword, 
    getUserData, 
    updatePassword,
    subscribeAccounts, 
    subscribeMovements,
    subscribeCategories,
    subscribeUser,
    removeUser
}

export default firebase 